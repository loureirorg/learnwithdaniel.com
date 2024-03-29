<template>
    <div class="dark:bg-gray-1000 bg-white dark:text-sepia text-gray-900">
        <Header />

        <div class="container mx-auto px-6 md:px-16 py-8 max-w-screen-md">

            <div class="py-8 md:py-16">
                <div>
                    <span
                        v-for="(tag) in $page.frontmatter.tags"
                        :key="tag"
                        class="dark:bg-gray-800 bg-gray-100 px-3 py-1 mx-1 rounded-full uppercase text-xs font-medium dark:text-green-700 tracking-wider"
                    >
                        {{tag}}
                    </span>
                </div>

                <h1 class="dark:text-green-500 text-4xl md:text-6xl py-6">{{this.effectiveTitle}}</h1>
                <p class="author text-sm">
                    by <span class="text-base font-bold">{{effectiveAuthor}}</span>
                    on <time class="mr-3">{{formatDate($page.frontmatter.date)}}</time>
                    <span class="reading-time text-xs uppercase py-4 block md:inline-block md:py-9">
                        <vp-icon size="1.5em" name="clock-best" class="inline-block" />
                        {{$page.readingTime.text}}
                    </span>
                </p>

            </div>

            <div class="post-wrap text-xl leading-10 pb-8">
                <Content />
            </div>


            <hr class="my-12" />

            <div>
                <h2 class="text-xl md:text-3xl pb-10 text-center">Comments</h2>
                <Disqus />
            </div>
        </div>

        <Footer />
    </div>
</template>

<style scoped>
@media(min-width: 768px) {
    .md\:text-6xl {
        font-size: 56px
    }
}
</style>

<style lang="stylus">
.author
    opacity: 0.9

.post-wrap .content__default > p
    margin: 0 0 32px 0
    line-height: 1.8
    font-weight: 400

.post-wrap .content__default > p:first-of-type
    font-size: 1.25em
    font-weight: 400

.post-wrap h2
    font-weight: 600
    font-size: 45px
    line-height: 1.4
    margin: 5px 0 25px

.post-wrap * + h2
    margin-top: 120px

.post-wrap h3
    font-weight: 600
    margin: 50px 0 15px 0
    font-size: 30px
    line-height: 1.4

.post-wrap h4
    font-weight: 700
    margin: 50px 0 12px 0
    font-size: 22px
    line-height: 1.4

.post-wrap h5
    font-weight: 600
    margin: 5px 0 25px
    font-size: 20px
    line-height: 1.4

.post-wrap p > img
    margin-top: 32px
    margin-left: auto
    margin-right: auto

.post-wrap .iframe iframe
    max-width: 700px

@media(min-width: 1300px)
    .post-wrap img[src*="#wide"],
    .post-wrap .extra-class,
    .post-wrap .youtube,
    .post-wrap .iframe.wide
        margin-left: calc((700px - 1200px) / 2 + 85px)
        width: calc(1200px - 85px - 85px)
        max-width: none

.post-wrap .iframe
    margin-bottom: 32px

.post-wrap .youtube
    max-width: 700px
    margin: 1.5em auto
    position relative

.post-wrap .youtube::before
    content: ' '
    display: block
    padding-top: 75%

.post-wrap .youtube iframe
    width: 100%
    height: 100%
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0

.post-wrap li > img
    margin-top: 12px

.post-wrap h2 + p > img
    margin-top: 32px

.post-wrap .custom-block + p
    margin-top: 48px

.post-wrap ul
    list-style: disc outside;

.post-wrap ul, .post-wrap ol
    margin: 0 0 25px
    margin-left: 1em
    margin-bottom: 32px
    padding-left: 20px

.post-wrap li
    line-height: 1.8
    margin-bottom: 10px

.post-wrap p > code
    font-size: 90%
    margin: 0
    padding: 0.25rem 0.5rem
    border-radius: 0.25rem
    color: theme('colors.gray.700')
    background-color: theme('colors.gray.200')

@media (prefers-color-scheme: dark)
    .post-wrap p > code
        color: theme('colors.gray.400')
        background-color: theme('colors.gray.700')

.post-wrap div[class*="language-"] .highlight-lines .highlighted
    background: rgba(256, 128, 0, 0.3)
    transform: translateY(2px)

// Header Color
// @media (prefers-color-scheme: dark)
//     .post-wrap h2,
//     .post-wrap h3,
//     .post-wrap h4,
//     .post-wrap h5
//         color: theme('colors.gray.400')

.post-wrap p > a,
.post-wrap li > a,
.post-wrap h2 > a:not(.header-anchor),
.post-wrap h3 > a:not(.header-anchor),
.post-wrap h4 > a:not(.header-anchor),
.post-wrap h5 > a:not(.header-anchor)
    color: #2080ad

.post-wrap blockquote
    background-color: rgba(230,230,230,0.3)
    margin: 1.5em 10px
    padding: 1em
    padding-left: 10px
    quotes: "\201C""\201D""\2018""\2019"
    border-left: 10px solid #ccc
    font-style: italic

@media (prefers-color-scheme: dark)
    .post-wrap blockquote
        background-color: theme('colors.gray.800')
        color: theme('colors.gray.400')

.post-wrap blockquote:before
    color: #ccc
    content: open-quote
    font-size: 4em
    line-height: 0.1em
    position: absolute
    margin-top: 25px

.post-wrap blockquote p
    display: inline-block
    margin-left: 60px

.post-wrap .custom-block .custom-block-title
    font-weight: 600

.post-wrap .custom-block.danger .custom-block-title
    color: #900

.post-wrap .custom-block.warning .custom-block-title
    color: #b29400

.post-wrap .custom-block.danger,
.post-wrap .custom-block.tip,
.post-wrap .custom-block.warning,
.post-wrap .custom-block.success,
.post-wrap .custom-block.info
    padding: 1rem 1.5rem 2rem 1.5rem
    border-left-width: .5rem
    border-left-style: solid
    margin: 1rem 0

.post-wrap .custom-block.danger
    background-color: #ffe6e6
    border-color: #c00
    color: #4d0000

.post-wrap .custom-block.success
    background-color: #cce5ff
    border-color: transparent
    color: #004085
    padding-top: 1.5rem

.post-wrap .custom-block.info
    background-color: theme('colors.blue.200')
    border-color: theme('colors.blue.900')
    color: theme('colors.blue.900')

@media (prefers-color-scheme: dark)
    .post-wrap .custom-block.info
        border-color: theme('colors.blue.900')
    .post-wrap .custom-block.info .custom-block-title
        color: theme('colors.blue.700')

.post-wrap .custom-block.warning
    background-color: rgba(255,229,100,0.3)
    border-color: #e7c000
    color: #6b5900

.post-wrap .custom-block.tip
    background-color: #f3f5f7
    border-color: #42b983

.post-wrap .custom-block.danger p,
.post-wrap .custom-block.tip p,
.post-wrap .custom-block.info p,
.post-wrap .custom-block.warning p
    margin-top: 16px
    line-height: 1.8

.post-wrap .custom-block.danger p
    color: #4d0000

@media (prefers-color-scheme: dark)
    .post-wrap .custom-block.danger p
        color: theme('colors.red.500')

.post-wrap .custom-block.warning p
    color: #6b5900

// @media (prefers-color-scheme: dark)
//     .post-wrap .custom-block.warning p
//         color: theme('colors.yellow.500')

@media (prefers-color-scheme: dark)
    .post-wrap .custom-block.danger,
    .post-wrap .custom-block.tip,
    .post-wrap .custom-block.warning,
    .post-wrap .custom-block.success,
    .post-wrap .custom-block.info
        background-color: theme('colors.gray.800')
        color: theme('colors.gray.400')

.post-wrap hr
    max-width: 100px
    margin: 30px auto
    color: $hrLine
    background-color: transparent
    border-width: 0
    border-bottom: 2px solid $hrLine
    height: 30px

.post-wrap hr+h2
    margin-top: 80px

.post-wrap table
    margin: 0 0 50px 0
    line-height: 1.8
    box-sizing: border-box
    width: 100%
    max-width: 100%
    border-collapse: collapse
    background-color: transparent

.post-wrap th:first-child,
.post-wrap td:first-child
    padding-left: 0

.post-wrap th,
.post-wrap td
    padding: 10px 12px
    padding-left: 12px
    text-align: left
    border-bottom: 1px solid #dde0e0
    // color: $textColor
</style>

<script>
import Header from '@theme/components/Header'
import Footer from '@theme/components/Footer'
import { formatDate } from '@theme/utils'
import { Comment } from '@vuepress/plugin-blog/lib/client/components'

export default {
    components: { Header, Footer, Comment },
    props: {
        title: String,
        date: String,
    },
    computed: {
        effectiveTitle() {
            return this.title || this.$page.frontmatter.header_title || this.$page.title
        },
        effectiveAuthor() {
            return this.author || this.$page.frontmatter.author || this.$page.author
        },
    },
    methods: {
        formatDate(date) {
            return formatDate(date)
        },
    },
}
</script>
