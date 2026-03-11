<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

	// Svelte 5 Props (using $props)
	let { onScanSuccess = (text: string) => console.log(text), fps = 10, qrbox = 250 } = $props();

	let scanner: Html5QrcodeScanner | null = null;
	let scannerId = 'qr-reader'; // Unique ID for the DOM element

	$effect(() => {
		// Initialize the scanner after the component is mounted
		scanner = new Html5QrcodeScanner(
			scannerId,
			{
				fps,
				qrbox,
				// Favor the back camera on mobile
				supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
			},
			/* verbose= */ false
		);

		scanner.render(
			(decodedText) => {
				onScanSuccess(decodedText);
			},
			(errorMessage) => {
				// This fires constantly if no QR is in view,
				// so we usually leave it empty.
			}
		);

		// Cleanup on component destruction
		return () => {
			if (scanner) {
				scanner.clear().catch((error) => {
					console.error('Failed to clear html5QrcodeScanner', error);
				});
			}
		};
	});
</script>

<div id={scannerId} class="scanner-container"></div>

<style>
	.scanner-container {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		border-radius: 8px;
		overflow: hidden;
	}

	/* The library injects its own buttons; you can style them here */
	:global(#qr-reader__dashboard_section_csr button) {
		background-color: #ff3e00;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
