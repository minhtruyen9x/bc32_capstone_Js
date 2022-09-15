function handleToggle(e) {
    let element = e.target.closest("[data-toggle]")
    if (!element) return

    const dataType = element.dataset.toggle

    if (dataType === "dropdown") {
        element.classList.toggle("open")
        return
    }


    const toggleTargetID = element.dataset.target
    const toggleElement = document.querySelector(toggleTargetID)
    if (dataType === "tab") {
        const elementActive = element.parentElement.querySelector("[data-toggle='tab'].active")
        elementActive.classList.remove("active")
        element.classList.add("active")
        return
    }

    if (dataType === "button") {
        toggleElement.classList.toggle("open")
        return
    }

    if (dataType === "menu") {
        setTimeout(() => { toggleElement.classList.toggle("open") }, 0)
        document.querySelector(".overlay").classList.toggle("active")
        return
    }

    if (dataType === "modal") {
        setTimeout(() => { toggleElement.classList.toggle("open") }, 0)
        document.querySelector(".overlay").classList.toggle("active")
        return
    }

    if (dataType === "theme") {
        toggleElement.classList.toggle("dark")

        if (toggleElement.classList.contains("dark")) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        return
    }
}
document.addEventListener("click", handleToggle)