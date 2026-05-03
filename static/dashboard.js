//  Dashboard Logic 
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const filterLinks = document.querySelectorAll('.filter-menu a');
    

    // Logic to close dropdown when clicking outside
    window.addEventListener('click', (e) => {
        const menu = document.getElementById("user-dropdown");
        const btn = document.getElementById("user-menu-btn");
        
        // If the menu is open AND the click was not on the button
        if (!menu.classList.contains('hidden') && !btn.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });

    
    
    // Handle Search functionality
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const query = searchInput.value.toLowerCase();
            console.log("Searching for:", query);
            // In the future, this will filter the DOM elements or make an API call
        });
    }
    // Handle Category Filter Clicks
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            // Remove active style from all links
            filterLinks.forEach(l => {
                l.style.textDecoration = 'none';
            });
            // Add active style to clicked link
            target.style.textDecoration = 'underline';
            console.log("Filtering by:", target.innerText);
        });
    });
});

//Must be at the end of the file to work properly
function toggleUserMenu() {
    const menu = document.getElementById("user-dropdown");
    menu.classList.toggle("hidden");
}   

document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.getElementById("tooltip");

    let step = 0;

    const dashboardTitle = document.querySelector(".navbar h2");
    const settings = document.querySelector("select");
    const filterLinks = document.querySelectorAll(".filter-menu a");

    function show(text, element) {
        const rect = element.getBoundingClientRect();

        tooltip.innerText = text;
        tooltip.style.top = rect.top + window.scrollY + 50 + "px";
        tooltip.style.left = rect.left + "px";

        tooltip.classList.remove("hidden");
        tooltip.classList.add("show");
    }

    function hide() {
        tooltip.classList.remove("show");
        setTimeout(() => tooltip.classList.add("hidden"), 200);
    }

    // STEP 1: first interaction anywhere
    document.body.addEventListener("click", function firstStep() {
        if (step !== 0) return;

        show("This is your dashboard where all items are listed.", dashboardTitle);
        step = 1;
    }, { once: true });

    // STEP 2: when user opens settings
    settings.addEventListener("change", () => {
        if (step !== 1) return;

        show("Use settings to create or manage your listings.", settings);
        step = 2;
    });

    // STEP 3: when user clicks filter
    filterLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (step !== 2) return;

            show("Use filters to sort items by category.", link);
            step = 3;
        });
    });

    // optional: hide tooltip on any click
    document.addEventListener("click", () => {
        hide();
    });
});