<script lang="ts">
	import { onMount } from 'svelte';
	import Hls from 'hls.js';

	const src = '/pov/playlist.m3u8';
	const STREAM_START = new Date('2026-03-16T12:00:00Z').getTime();
	const DURATION = 324;

	let hls: Hls | null = null;

	let video: HTMLVideoElement | null = $state(null);

	function syncToLive() {
		if (!video) return;
		const elapsed = (Date.now() - STREAM_START) / 1000;
		video.currentTime = elapsed % DURATION;
	}

	let mounted = $state(false);
	onMount(() => {
		mounted = true;

		if (!video) return;

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);

			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				if (!video) return;
				syncToLive();
				video.play();
			});
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			// Native HLS support (e.g., Safari/iOS)
			video.src = src;

			video.play();
		} else {
			console.error('HLS is not supported in this browser.');
		}

		return () => {
			// Cleanup on component destruction
			if (hls) {
				hls.destroy();
			}
		};
	});
</script>

<video
	loop
	bind:this={video}
	muted
	controlslist="nodownload noplaybackrate"
	playsinline
	preload="auto"
	class={[
		'absolute inset-0 h-full w-full object-cover opacity-0',
		mounted && 'opacity-100',
		'transition duration-300 ease-in'
	]}
	style="accent-color: red;"
>
</video>
