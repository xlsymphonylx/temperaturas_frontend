export default {
    methods: {
        successAlert(message, title) {
            this.$swal({
                icon: "success",
                title: title || "Exito!",
                text: message,
                showConfirmButton: false,
                timer: 1500,
            });
        },
        errorAlert(message, title) {
            this.$swal({
                icon: "error",
                title: title || "Error!",
                text: message,
                showConfirmButton: false,
                timer: 1500,
            });
        },
        async questionAlert(message, title) {
            return await this.$swal({
                title: title || "Estas seguro?",
                text: message,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminalo!",
            });
        },
    },
};
