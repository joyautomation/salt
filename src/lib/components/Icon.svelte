<script lang="ts">
  export let path: string;
  export let size = 24;
  export let className = '';

  let svgContent = '';
  const basePath = '/src/lib/components/icons/svg';

  async function loadSvg() {
    try {
      const fullPath = `${basePath}/${path}.svg`;
      const response = await fetch(fullPath);
      if (!response.ok) throw new Error('Failed to load SVG');
      svgContent = await response.text();
    } catch (error) {
      console.error('Error loading SVG:', error);
    }
  }

  $: if (path) {
    loadSvg();
  }
</script>

{#if svgContent}
  <div 
    class={className}
    style:width={size}
    style:height={size}
  >
    {@html svgContent}
  </div>
{/if}

<style>
  div :global(svg) {
    width: 100%;
    height: 100%;
  }
</style>