<template>
    <div class="flex flex-col min-h-screen dark:bg-gray-900 bg-white">

        <Header />

        <ArticleList :articles="$pagination.pages"  class="container mx-auto px-6 py-8 max-w-screen-md" />

        <div class="text-center">
            <Pagination />
        </div>

        <div class="flex flex-1">
            <Footer class="place-self-end w-full" />
        </div>
    </div>
</template>

<script>
import Header from '@theme/components/Header'
import Footer from '@theme/components/Footer'
import ArticleList from '@theme/components/ArticleList'
import { Pagination } from '@vuepress/plugin-blog/lib/client/components'

import { sortByDate } from '@theme/utils'

export default {
    components: { Header, Footer, ArticleList, Pagination },
}
</script>
