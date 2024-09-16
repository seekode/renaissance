<script lang="ts">
	const {
		title = 'Renaissance',
		description = 'Salon de beauté à Nice offrant coiffure, manucure, épilation, soins esthétiques et massages. Redécouvrez votre beauté et bien-être. La où vous reprenez vie.',
		keywords = 'Coiffure, Manucure, Soins esthétiques, Massages, Salon de beauté, Nice, Renaissance'
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content="seekode | Nicolas Texier" />
	<meta property="og:title" content="Renaissance" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="/network-card.png" />
	<meta property="og:url" content="https://renaissance-salon.fr/" />
	<meta property="og:site_name" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="fr_FR" />
	<meta property="og:locale:alternate" content="fr_FR" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="/network-card.png" />
</svelte:head>
