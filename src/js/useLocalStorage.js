import { watch } from "vue";

export default function (initVal, key) {
    const val = initVal
    const my_storage = window.localStorage.getItem(key)

    if (my_storage) {
        val.value = JSON.parse(my_storage)
    }

    watch(val, val => {
        window.localStorage.setItem(key, JSON.stringify(val))
    }, { deep: true })

    return val
}