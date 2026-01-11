<template>
    <header class="page-header">
        <h1 class="page-title">{{ title }}</h1>
        <p class="description">{{ description }}</p>
        <div class="divider">
            <span class="divider-icon">{{ icon }}</span>
        </div>
    </header>
</template>
<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: "✨"
    }
});
</script>
<style scoped>
.page-header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
}

.page-title {
    font-size: 40px;
    margin-bottom: 16px;
    font-weight: 600;
    background: var(--title-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: 2px;
    text-shadow: var(--title-shadow);
}

.description {
    font-size: 18px;
    opacity: 0.95;
    margin-bottom: 20px;
    font-style: italic;
    max-width: 800px;
    margin: 0 auto 30px;
    text-shadow: var(--title-shadow);
    color: var(--text-secondary);
}

.divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--divider-color);
    margin: 0 15px;
}

.divider-icon {
    font-size: 24px;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .page-title {
        font-size: 32px;
    }

    .description {
        font-size: 16px;
    }
}
</style>
