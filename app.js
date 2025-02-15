(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

 

document.getElementById('contact-form').addEventListener('submit' , async function(event){
    event.preventDefault();

    const btnText = document.querySelector(".handleText");
    const btnIcon = document.querySelector(".handleIcon");
    const sendBtn = document.querySelector(".sendBtn");



    btnText.textContent = "Sending...";
    btnIcon.innerHTML = ""; 
    const loader = document.createElement("div");
    loader.classList.add("loader");
    btnIcon.appendChild(loader); // Append loader
    sendBtn.disabled = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMessage = document.getElementById("response-message");

    // Validate inputs
    if (!name || !email || !subject || !message) {
        responseMessage.style.color = "red";
        responseMessage.innerText = "All fields are required!";
        return;
    }

    const formData = { name, email, subject, message };

    try {
        const response = await fetch("http://localhost:3000/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            btnText.textContent = "Sent!";
            btnIcon.innerHTML = `<i class="fas fa-check"></i>`; 
            document.getElementById("contact-form").reset();
        } else {
            btnText.textContent = "Try Again";
            btnIcon.innerHTML = `<i class="fas fa-exclamation-circle"></i>`;
        }
    } catch (error) {
        
        console.error("Error:", error);
    }

    // Reset button after 3 seconds
    setTimeout(() => {
        btnText.textContent = "Send Message";
        btnIcon.innerHTML = `<i class="fas fa-paper-plane"></i>`;
        sendBtn.disabled = false;
    }, 4000);

})
