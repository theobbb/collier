<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import type { Map as MapLibreMap, Marker } from 'maplibre-gl';
	import { data, type Dog } from '$lib/data.svelte';
	import { dev } from '$app/environment';

	const PAUSED = dev && false;

	type WalkingDog = Dog & {
		speed: number;
		path: [number, number][];
	};

	let mapContainer: HTMLDivElement;
	let map: MapLibreMap;
	let animationId: number;
	let markers: Marker[] = [];
	let stepCounters: number[] = [];

	// UPDATED: Now supports rotationDeg
	function generateSquarePath(
		center: [number, number],
		sizeDeg: number,
		offsetX: number = 0,
		offsetY: number = 0,
		rotationDeg: number = 0
	): [number, number][] {
		const cx = center[0] + offsetX;
		const cy = center[1] + offsetY;
		const half = sizeDeg / 2;
		const aspectCorrect = 0.6;

		// Convert degrees to radians for the math functions
		const angleRad = (rotationDeg * Math.PI) / 180;

		// The 4 corners around a 0,0 origin
		const basePoints = [
			[-half, half], // Top-left
			[half, half], // Top-right
			[half, -half], // Bottom-right
			[-half, -half], // Bottom-left
			[-half, half] // Back to Top-left to close the loop
		];

		return basePoints.map(([bx, by]) => {
			// Apply 2D rotation
			const rotatedX = bx * Math.cos(angleRad) - by * Math.sin(angleRad);
			const rotatedY = bx * Math.sin(angleRad) + by * Math.cos(angleRad);

			// Translate to center and apply aspect ratio squash to the Y axis
			return [cx + rotatedX, cy + rotatedY * aspectCorrect];
		});
	}

	const CENTER: [number, number] = [-73.562185, 45.512756];

	const paths: [number, number][][] = [
		generateSquarePath(CENTER, 0.006, 0.003, 0.001, 60),
		generateSquarePath(CENTER, 0.004, 0, 0, 50),

		generateSquarePath(CENTER, 0.003, -0.003, -0.002, 70)
	];
	const speeds = [1.5, 0.4, 1];

	const dogs: WalkingDog[] = $derived(
		[...data.dogs].map((dog, i) => ({
			...dog,
			speed: speeds[i % speeds.length], // FIXED
			path: paths[i % paths.length]
		}))
	);

	function lerp(a: [number, number], b: [number, number], t: number): [number, number] {
		return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
	}

	function buildDensePath(path: [number, number][], stepsPerSegment = 100): [number, number][] {
		const dense: [number, number][] = [];
		for (let i = 0; i < path.length - 1; i++) {
			for (let s = 0; s < stepsPerSegment; s++) {
				dense.push(lerp(path[i], path[i + 1], s / stepsPerSegment));
			}
		}
		return dense;
	}

	const densePaths = dogs.map((d) => buildDensePath(d.path, 100));

	function createMarkerEl(dog: Dog): HTMLElement {
		const el = document.createElement('div');
		el.className = 'dog-marker';
		el.innerHTML = `
      <div class="dog-bubble card">
        <svg height={48} height={48}>
            <use href="/avatars.svg#avatar-${dog.avatar}" />
        </svg>
      </div>
      
    `;
		return el;
	}
	// function createMarkerEl(dog: Dog): HTMLElement {
	// 	const el = document.createElement('div');
	// 	el.className = 'dog-marker';
	// 	el.innerHTML = `
	//   <div class="dog-bubble" style="--dog-color: ${dog.color}">

	//     <span class="dog-emoji">${dog.name}</span>
	//     <div class="dog-pulse" style="--dog-color: ${dog.color}"></div>
	//   </div>
	//   <div class="dog-label">${dog.name}</div>
	// `;
	// 	return el;
	// }

	onMount(async () => {
		if (PAUSED) return;
		const maplibregl = (await import('maplibre-gl')).default;

		map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://tiles.openfreemap.org/styles/bright',
			center: CENTER,
			zoom: 15.2,
			pitch: 0,
			bearing: 0
		});

		map.on('load', () => {
			// UPDATED: Switch all map labels to French
			const style = map.getStyle();
			if (style && style.layers) {
				style.layers.forEach((layer) => {
					const id = layer.id;

					const isTransit =
						id.includes('transit') ||
						id.includes('subway') ||
						id.includes('metro') ||
						id.includes('railway') ||
						id.includes('rail');

					if (isTransit) {
						map.setLayoutProperty(id, 'visibility', 'none');
					}
				});

				// Keep your French label logic separate
				style.layers.forEach((layer) => {
					if (layer.type === 'symbol' && layer.layout?.['text-field']) {
						map.setLayoutProperty(layer.id, 'text-field', [
							'coalesce',
							['get', 'name:fr'],
							['get', 'name']
						]);
					}
				});
			}

			// Minimalist overrides: mute everything that isn't essential
			const layersToMute = ['building', 'building-top'];
			layersToMute.forEach((id) => {
				if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', 'none');
			});

			// Draw dashed path lines
			dogs.forEach((dog, i) => {
				const id = `path-${i}`;
				map.addSource(id, {
					type: 'geojson',
					data: {
						type: 'Feature',
						geometry: { type: 'LineString', coordinates: dog.path },
						properties: {}
					}
				});
				map.addLayer({
					id,
					type: 'line',
					source: id,
					layout: { 'line-join': 'round', 'line-cap': 'round' },
					paint: {
						'line-color': 'black',
						'line-width': 2,
						'line-opacity': 0.5,
						'line-dasharray': [3, 4]
					}
				});
			});

			// Create markers and kick off animation
			dogs.forEach((dog, i) => {
				const el = createMarkerEl(dog);
				const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
					.setLngLat(dog.path[0])
					.addTo(map);
				markers.push(marker);
				stepCounters.push(0);
			});

			let lastTime = -1;
			function animate(time: number) {
				if (lastTime === -1) {
					lastTime = time;
					animationId = requestAnimationFrame(animate);
					return;
				}
				const delta = time - lastTime;
				lastTime = time;
				dogs.forEach((dog, i) => {
					stepCounters[i] += dog.speed * (delta / 16.67);
					const path = densePaths[i];
					const step = Math.floor(stepCounters[i]) % path.length;
					markers[i].setLngLat(path[step]);
				});
				animationId = requestAnimationFrame(animate);
			}
			animationId = requestAnimationFrame(animate);
		});
	});

	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId);
		markers.forEach((m) => m.remove());
		if (map) map.remove();
	});
</script>

<div class="-z-10 flex h-full w-full flex-col">
	<div class="relative flex-1">
		<div bind:this={mapContainer} class="map h-full w-full"></div>
	</div>
</div>

<style>
	/* Remove MapLibre default controls chrome */
</style>
