<template>
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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.modal {
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: flex;
    height: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal-content {
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    width: 80%;
    margin: auto;
    min-width: none;
    background: #fff;
    margin: auto;
    padding-top: 50px;
}

.modal-header {
    height: 10px;
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
    height: 100%;
    padding: 50px;
    text-align: left;
}

.modal-close {
    padding: 5px;
    cursor: pointer;
}

</style>