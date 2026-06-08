const characterGrid = document.getElementById("character-grid");

async function loadCharacters() {
    try {
        const response = await fetch("/api/characters");
        const characters = await response.json();

        characterGrid.innerHTML = "";

        characters.forEach((character) => {
            const card = document.createElement("article");
            card.classList.add("character-card");

            card.innerHTML = `
                <div class="card-header">
                    <h3>${character.name}</h3>
                    <span class="difficulty-badge">
                        ${character.difficulty}
                    </span>
                </div>

                <div class="character-info">
                    <p><strong>Race:</strong> ${character.race}</p>
                    <p><strong>Class:</strong> ${character.classType}</p>
                    <p><strong>Role:</strong> ${character.role}</p>
                </div>

                <p class="personality">
                    ${character.personality}
                </p>

                <a
                    href="/characters/${character.slug}"
                    role="button"
                    class="view-btn"
                >
                    View Character
                </a>
            `;

            characterGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Failed to load characters:", error);

        characterGrid.innerHTML = `
            <article>
                <h3>Error Loading Companions</h3>
                <p>
                    The companions could not be summoned from the Forgotten Realms.
                </p>
            </article>
        `;
    }
}

loadCharacters();