<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Map as MapLibreMap, Marker } from 'maplibre-gl';

	interface Dog {
		name: string;
		emoji: string;
		color: string;
		speed: number;
		path: [number, number][];
	}

	let mapContainer: HTMLDivElement;
	let map: MapLibreMap;
	let animationId: number;
	let markers: Marker[] = [];
	let stepCounters: number[] = [];

	function generateCircularPath(
		center: [number, number],
		radiusDeg: number,
		numPoints: number = 8
	): [number, number][] {
		const points: [number, number][] = [];
		for (let i = 0; i <= numPoints; i++) {
			const angle = (i / numPoints) * Math.PI * 2;
			points.push([
				center[0] + Math.cos(angle) * radiusDeg,
				center[1] + Math.sin(angle) * radiusDeg * 0.6 // 0.6 corrects for lng/lat aspect ratio at this latitude
			]);
		}
		return points;
	}

	const CENTER: [number, number] = [-73.562185, 45.512756];

	const dogs: Dog[] = [
		{
			name: 'Biscuit',
			emoji: '🐕',
			color: '#e85d26',
			speed: 1,
			path: generateCircularPath(CENTER, 0.004)
		},
		{
			name: 'Mochi',
			emoji: '🐩',
			color: '#7c5cdb',
			speed: 1.6,
			path: generateCircularPath(CENTER, 0.006, 10)
		},
		{
			name: 'Rex',
			emoji: '🦮',
			color: '#2a9d5c',
			speed: 0.8,
			path: generateCircularPath(CENTER, 0.002, 6)
		}
	];

	function lerp(a: [number, number], b: [number, number], t: number): [number, number] {
		return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
	}

	function buildDensePath(path: [number, number][], stepsPerSegment = 80): [number, number][] {
		const dense: [number, number][] = [];
		for (let i = 0; i < path.length - 1; i++) {
			for (let s = 0; s < stepsPerSegment; s++) {
				dense.push(lerp(path[i], path[i + 1], s / stepsPerSegment));
			}
		}
		return dense;
	}

	const densePaths = dogs.map((d) => buildDensePath(d.path));

	function createMarkerEl(dog: Dog): HTMLElement {
		const el = document.createElement('div');
		el.className = 'dog-marker';
		el.innerHTML = `
      <div class="dog-bubble" style="--dog-color: ${dog.color}">
        <span class="dog-emoji">${dog.emoji}</span>
        <div class="dog-pulse" style="--dog-color: ${dog.color}"></div>
      </div>
      <div class="dog-label">${dog.name}</div>
    `;
		return el;
	}

	onMount(async () => {
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
						'line-color': dog.color,
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

<div class="root">
	<header class="bar">
		<span class="bar-title">🐾 PawWatch</span>
		<div class="bar-dogs">
			{#each dogs as dog}
				<span class="dog-tag" style="--c: {dog.color}">
					<span class="dot"></span>{dog.emoji}
					{dog.name}
				</span>
			{/each}
		</div>
		<span class="live">● live</span>
	</header>

	<div class="map-wrap">
		<div bind:this={mapContainer} class="map"></div>
	</div>
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.root {
		font-family: 'IBM Plex Mono', monospace;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f5f4f0;
	}

	/* ── Top bar ── */
	.bar {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 0 20px;
		height: 48px;
		background: #f5f4f0;
		border-bottom: 1px solid #d8d6cf;
		flex-shrink: 0;
	}

	.bar-title {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: #1a1a1a;
		white-space: nowrap;
	}

	.bar-dogs {
		display: flex;
		gap: 12px;
		flex: 1;
	}

	.dog-tag {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 0.7rem;
		color: #444;
		letter-spacing: 0.03em;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--c);
		animation: blink 1.6s ease-in-out infinite;
		flex-shrink: 0;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
	}

	.live {
		font-size: 0.65rem;
		color: #2a9d5c;
		letter-spacing: 0.08em;
		animation: blink 1.6s ease-in-out infinite;
		white-space: nowrap;
	}

	/* ── Map ── */
	.map-wrap {
		flex: 1;
		position: relative;
	}

	.map {
		width: 100%;
		height: 100%;
	}

	/* Remove MapLibre default controls chrome */
	:global(.maplibregl-ctrl-logo),
	:global(.maplibregl-ctrl-attrib) {
		opacity: 0.35 !important;
		font-size: 0.55rem !important;
	}

	/* ── Markers (injected into DOM, must be global) ── */
	:global(.dog-marker) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		cursor: default;
		user-select: none;
	}

	:global(.dog-bubble) {
		position: relative;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #f5f4f0;
		border: 2px solid var(--dog-color);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
	}

	:global(.dog-emoji) {
		font-size: 1.1rem;
		line-height: 1;
	}

	:global(.dog-pulse) {
		position: absolute;
		inset: -5px;
		border-radius: 50%;
		border: 1.5px solid var(--dog-color);
		opacity: 0;
		animation: pulse 2.2s ease-out infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.85);
			opacity: 0.6;
		}
		100% {
			transform: scale(1.9);
			opacity: 0;
		}
	}

	:global(.dog-label) {
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.58rem;
		letter-spacing: 0.04em;
		color: #1a1a1a;
		background: #f5f4f0;
		border: 1px solid #d8d6cf;
		padding: 1px 6px;
		border-radius: 3px;
		white-space: nowrap;
	}
</style>
