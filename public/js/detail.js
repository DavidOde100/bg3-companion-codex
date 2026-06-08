const characterName = document.getElementById("character-name");
const characterTitle = document.getElementById("character-title");
const characterDetail = document.getElementById("character-detail");

const slug = window.location.pathname.split("/").pop();

async function loadCharacterDetail() {
    try {
        const response = await fetch(`/api/characters/${slug}`);

        if (!response.ok) {
            window.location.href = "/404.html";
            return;
        }

        const character = await response.json();

        document.title = `${character.name} | Tavern Codex`;

        characterName.textContent = character.name;
        characterTitle.textContent = `${character.race} ${character.classType} • ${character.role}`;

        characterDetail.innerHTML = `
            <div class="detail-layout">
                <div class="detail-image-box">
                    <img
                        src="${character.image}"
                        alt="${character.name}"
                        class="detail-image"
                    >
                </div>

                <div class="detail-content">
                    <h2>${character.name}</h2>

                    <blockquote>
                        “${character.quote}”
                    </blockquote>

                    <div class="detail-grid">
                        <p><strong>Race:</strong> ${character.race}</p>
                        <p><strong>Class:</strong> ${character.classType}</p>
                        <p><strong>Role:</strong> ${character.role}</p>
                        <p><strong>Difficulty:</strong> ${character.difficulty}</p>
                        <p><strong>Vibe:</strong> ${character.vibe}</p>
                    </div>

                    <hr>

                    <h3>Personality</h3>
                    <p>${character.personality}</p>

                    <h3>Backstory</h3>
                    <p>${character.backstory}</p>

                    <h3>Strengths</h3>
                    <p>${character.strengths}</p>

                    <h3>Weakness</h3>
                    <p>${character.weakness}</p>

                    <a href="/" role="button" class="view-btn">
                        Return to Archive
                    </a>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Failed to load character details:", error);

        characterDetail.innerHTML = `
            <article>
                <h2>Character Not Found</h2>
                <p>
                    This companion could not be found in the Tavern Codex.
                </p>

                <a href="/" role="button">
                    Return Home
                </a>
            </article>
        `;
    }
}

loadCharacterDetail();