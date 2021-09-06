<template>
    <div class="flex flex-col min-h-screen dark:bg-gray-1000 bg-white">

        <Header />

        <ArticleList :articles="posts_active()"  class="container mx-auto px-6 py-8 max-w-screen-md" />

        <div class="text-center">
            <Pagination />
        </div>

        <div class="flex flex-1">
            <Footer class="place-self-end w-full" />
        </div>
    </div>
</template>

<style lang="stylus">
@media (prefers-color-scheme: dark)
    .pagination > li > *,
    .pagination > li > *:hover
        background-color: transparent !important
        border: 1px solid #333 !important

    .pagination > li.active > *
        background-color: theme('colors.green.800') !important
</style>

<script>
import Header from '@theme/components/Header'
import Footer from '@theme/components/Footer'
import ArticleList from '@theme/components/ArticleList'
import { Pagination } from '@vuepress/plugin-blog/lib/client/components'

import { sortByDate } from '@theme/utils'

export default {
    components: { Header, Footer, ArticleList, Pagination },
    methods: {
        posts_active() {
            return this.$pagination.pages
                .filter((page) => !page.frontmatter.status || 'active' === page.frontmatter.status)
        },
    },
}
</script>
