<template>
    <section>
        <article v-for="article in articles" :key="article.key" class="pb-8 border-b">
            <h2 class="text-primary text-4xl md:text-5xl font-medium text-center mt-10 leading-tight mb-3">
                <router-link :to="article.path">
                    {{article.title}}
                </router-link>
            </h2>
            <ul class="flex flex-row justify-center text-gray-600 mb-6">
                <li>Daniel Loureiro</li>
                <li class="mx-2">-</li>
                <li>{{formatDate(article.frontmatter.date)}}</li>
            </ul>
            <p class="text-justify text-xl mb-6">
                {{article.excerpt | strippedContent}}
            </p>
            <div class="flex justify-center text-xs text-blue-500 uppercase">
                <router-link :to="article.path" class="border py-2 px-4">
                    Continue Reading
                </router-link>
            </div>
        </article>
    </section>
</template>

<script>
import { formatDate } from '@theme/utils'

export default {
    props: {
        articles: Array,
    },
    created: function () {
        // console.log(this._props.articles);
    },
    filters: {
        strippedContent: function(string = "") {
            return string.replace(/<\/?[^>]+>/ig, " ");
        }
    },
    methods: {
        formatDate(date) {
            return formatDate(date)
        }
    },
}
</script>