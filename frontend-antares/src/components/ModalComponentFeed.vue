<template>
    <meta name="google-adsense-account" content="ca-pub-9172295644756939">
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <slot name="modal-title"></slot>
            </div>
            <div class="modal-body">
                <slot name="modal-text"></slot>
            </div>
            <div class="modal-input">
                <slot name="inputModal1"></slot>
            </div>
            <div class="modal-input">
                <slot name="inputModal2"></slot>
            </div>
            <div class="modal-footer">
                <slot name="botaoConfirmar"></slot>
                <slot name="botaoFechar"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalComponent',
    props: {
        placeholderText: String,
        buttons: Array,
    },

    methods: {
        fecharModal() {
            this.$emit('fecharModal')
        }
    }
};
</script>

<style scoped>

.modal {
    z-index: 9999;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal-content {
    flex-direction: column;
    display: flex;
    width: 100%;
    margin: auto;
    background: #fafafa;
    margin: auto;
}

.modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 0;
    text-align: center;
}

.modal-input {
    padding: 5px;
}


.modal-body {
    flex-grow: 1;
    padding: 20px;
    text-align: left;
}

.modal-close {
    padding: 5px;
    cursor: pointer;
}

</style>