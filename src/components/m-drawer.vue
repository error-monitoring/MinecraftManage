<template>
    <div class="mer-drawer"
        :class="{ 'is-fullscreen': fullscreen }"
        ref="drawer"
        :style="{width: width, right: visible ? '1px' : `-${width}`}">
        <div class="mer-drawer__header flex between align-items-center">
            <slot name="title">
                <span class="mer-drawer__title">{{ title }}</span>
            </slot>
            <i class="mer-drawer__close iconfont icon-guanbi" @click="handleClose"></i>
        </div>
        <div class="mer-drawer__body"><slot></slot></div>
        <div class="mer-drawer__footer flex align-items-center" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'MerDrawer',
    model: {
        prop: 'visible',
        event: 'update'
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },

        width: {
            type: String,
            default: '670px'
        },

        fullscreen: {
            type: Boolean,
            default: false
        },
    },

    data() {
        return {
            show: false,
            dom: null
        };
    },
    created() {
    },
    mounted () {
        this.show = this.visible

        this.$nextTick(() => {
            let dom = document.createElement('div')
            dom.classList.add('mer-overlay')
            dom.addEventListener('click', () => {
                this.handleClose()
            });
            this.dom = dom
        })
        this.visibleChange(this.visible)
    },
    watch: {
        visible(val) {
            this.visibleChange(val)
        }
    },

    computed: {},

    methods: {
        visibleChange (val) {
            if (val) {
                this.$emit('open', val);
                this.$nextTick(() => {
                    this.dom.classList.add('mer-overlay-enter')
                    setTimeout(() => {
                        this.dom.classList.remove('mer-overlay-enter')
                    }, 200);
                    this.$root.$children[0].$children[0].$refs.mainBody.$el.classList.add('mer-drawer-parent--hidden')
                    this.$root.$children[0].$children[0].$refs.mainBody.$el.appendChild(this.dom)
                })
            } else {
                this.$emit('close', val);
                this.$nextTick(() => {
                    this.dom.classList.add('mer-overlay-leave')
                    setTimeout(() => {
                        this.dom.classList.remove('mer-overlay-leave')
                    }, 200);
                    if (this.dom && this.dom.parentNode) {
                        this.dom.parentNode.removeChild(this.dom)
                    }
                    this.$root.$children[0].$children[0].$refs.mainBody.$el.classList.remove('mer-drawer-parent--hidden')
                })
            }
            this.show = val
        },
        handleClose() {
            this.show = false
            this.$emit('update:visible', this.show);
        },
    }
  };
</script>

<style lang="scss" scoped>
    @import "../assets/css/var.scss";
    .mer-drawer {
        height: calc(100% - 60px);
        background-color: #fff;
        position: fixed;
        top: 61px;
        right: 1px;
        z-index: 2001;
        transition: right 0.2s;
        &.is-fullscreen {
            width: 100% !important;
        }
        .mer-drawer__header {
            height: 59px;
            border-bottom: 1px solid $border;
            padding: 0 22px;
            font-size: 16px;
            .mer-drawer__title {
                color: $color-title;
            }
            .mer-drawer__close {
                color: $color-body;
                cursor: pointer;
                &:hover {
                    color: $color-title;
                }
            }
        }
        .mer-drawer__body {
            padding: 30px 50px;
            height: calc(100% - 60px - 77px);
            box-sizing: border-box;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .mer-drawer__footer {
            height: 76px;
            border-top: 1px solid $border;
            padding: 0 22px;
        }
    }
</style>