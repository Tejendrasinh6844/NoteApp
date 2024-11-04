export const Tooltip = (element)=>{
    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip",  "text-body-small")

    element.addEventListener("mouseenter",()=>{
        tooltip.textContent = this.dataset.tooltip;
        const {top,
            left,
            height,
            width
        }= this.getBoundingClientRect();

        tooltip.style.top = top + height + 4 + "px";
        tooltip.style.left = left + (width / 2 ) + "px";
        tooltip.style.transform = "translate(-50%,0)";
        document.body.appendChild(tooltip)
    })
    element.addEventListener("mouseleave", tooltip.remove.bind(tooltip))
}