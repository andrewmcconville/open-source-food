<template>
    <article class="about-view article">
        <div class="article__inner">
            <h1>About</h1>
            <ol class="about-view__list">
                <li>
                    <h2>User Research & Design</h2>
                    <ol class="about-view__list">
                        <li>
                            <h2>Figma</h2>
                            <p>My process and user research</p>
                            <p>
                                <a href="https://www.figma.com/file/z0bISmA65J3jG5l6MZN9ak/Process-Book/" target="_blank">https://www.figma.com/file/z0bISmA65J3jG5l6MZN9ak/Process-Book/</a>
                            </p>
                        </li>
                        <li>
                            <h2>Solar Icon Set</h2>
                            <p>I used these icons</p>
                            <p>
                                <a href="https://github.com/480-Design/Solar-Icon-Set/" target="_blank">https://github.com/480-Design/Solar-Icon-Set/</a>
                            </p>
                        </li>
                    </ol>
                </li>
                <li>
                    <h2>Code</h2>
                    <ol class="about-view__list">
                        <li>
                            <h2>GitHub</h2>
                            <p>My code</p>
                            <p>
                                <a href="https://github.com/andrewmcconville/open-source-food/" target="_blank">https://github.com/andrewmcconville/open-source-food/</a>
                            </p>
                        </li>
                        <li>
                            <h2>Web</h2>
                            <p>I wrote this app in HTML, CSS, and TypeScript (a strongly typed version of JavaScript)</p>
                            <p>
                                <a href="https://www.typescriptlang.org/" target="_blank">https://www.typescriptlang.org/</a>
                            </p>
                        </li>
                        <li>
                            <h2>Vue</h2>
                            <p>For URL routing and data binding</p>
                            <p>
                                <a href="https://v3.vuejs.org/" target="_blank">https://v3.vuejs.org/</a>
                            </p>
                        </li>
                        <li>
                            <h2>p5</h2>
                            <p>For video processing</p>
                            <p>
                                <a href="https://p5js.org/" target="_blank">https://p5js.org/</a>
                            </p>
                        </li>
                    </ol>
                </li>
                <li>
                    <h2>Usibility Testing</h2>
                    <ol class="about-view__list">
                    <li>
                        <h2>Qualitative</h2>
                        <ol class="about-view__list">
                            <li>
                                <h2>Huristic Evaluation</h2>
                                <p>Useful to conduct with a group designers</p>
                                <p>
                                    <a href="https://www.nngroup.com/articles/ten-usability-heuristics/" target="_blank">https://www.nngroup.com/articles/ten-usability-heuristics/</a>
                                </p>
                            </li>
                            <li>
                                <h2>Task Analysis with Think Aloud</h2>
                                <p>Useful to conduct with participants interested in the domain</p>
                                <p>
                                    <a href="https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/" target="_blank">https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/</a>
                                </p>
                            </li>
                        </ol>
                    </li>
                    <li>
                        <h2>Quantitative</h2>
                        <ol class="about-view__list">
                            <li>
                                <h2>Reaction cards</h2>
                                <p>Useful in testing over all impression of visual design and user experience</p>
                                <p>
                                    <a href="https://www.nngroup.com/articles/microsoft-desirability-toolkit/" target="_blank">https://www.nngroup.com/articles/microsoft-desirability-toolkit/</a>
                                </p>
                            </li>
                            <li>
                                <h2>SUS Survey</h2>
                                <p>Useful in testing over all user experience</p>
                                <p>
                                    <a href="https://www.nngroup.com/articles/measuring-perceived-usability/" target="_blank">https://www.nngroup.com/articles/measuring-perceived-usability/</a>
                                </p>
                            </li>
                        </ol>
                    </li>
                </ol>
                </li>
            </ol>
        </div>
    </article>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.about-view__list {
    list-style: decimal;
    padding-left: 20px;

    & > li > ol {
        list-style: lower-alpha;

        & > li > ol {
            list-style: decimal;

            & > li > ol {
                list-style: lower-alpha;
            }
        }
    }

    & li {
        margin-bottom: 24px;
        padding-left: 8px;

        &::marker {
            font-weight: 300;
            font-size: 19px;
        }
    }

    & h2 {
        font-size: 20px;
        font-weight: 400;
        margin: 0 0 4px 0;
    }

    & a {
        font-size: 14px;
    }
}
</style>
