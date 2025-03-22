document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    let counter = document.getElementById('counter');
    let count = 0;
    let likesList = document.querySelector(".likes");
    let likeCounts = {};
    let isPaused = false;

    let interval = setInterval(() => {
        if (!isPaused) {
            count++;
            counter.innerText = count;
        }
    }, 1000);

    let plus = document.getElementById('plus');
    let minus = document.getElementById('minus');
    let likeBtn = document.getElementById("heart");
    let pauseBtn = document.getElementById("pause");

    plus.addEventListener('click', () => {
        count++;
        counter.innerText = count;  
    });

    minus.addEventListener('click', () => {
        count--;
        counter.innerText = count;
    });

    likeBtn.addEventListener('click', () => {
        if (!likeCounts[count]) {
            likeCounts[count] = 1;
            let li = document.createElement("li");
            li.setAttribute("data-num", count);
            li.innerHTML = `${count} has been liked <span>1</span> time`;
            likesList.appendChild(li);
        } else {
            likeCounts[count]++;
            let existingLike = document.querySelector(`[data-num="${count}"] span`);
            if (existingLike) {
                existingLike.innerText = likeCounts[count];
                existingLike.parentNode.innerHTML = `${count} has been liked <span>${likeCounts[count]}</span> times`;
            }
        }
    });

    pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;

        if (isPaused) {
            clearInterval(interval);
            pauseBtn.innerText = "resume";
        } else {
            interval = setInterval(() => { 
                count++; 
                counter.innerText = count; 
            }, 1000);
            pauseBtn.innerText = "pause";
        }

        [plus, minus, likeBtn].forEach(btn => {
            btn.disabled = isPaused;
        });
    });

    
    let commentForm = document.getElementsByTagName("form")[0];  
    let commentList = document.querySelector(".comments"); 

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let commentText = commentForm.children[0].value.trim(); 
        if (commentText !== "") {
            let p = document.createElement("p");
            p.innerText = commentText;
            commentList.appendChild(p);

            commentForm.children[0].value = ""; 
        }
    });
});
