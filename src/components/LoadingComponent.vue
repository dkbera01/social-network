<template>
	<div class="flex w-full items-center justify-center h-screen bg-white bg-opacity-80 absolute">
		<div class="flex justify-center items-center text-center">
			<div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
		</div>
	</div>
</template>

<style scoped>
.loader {
	border-top-color: #3498db;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>