const characterGrid = document.getElementById("character-grid");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchField = document.getElementById("search-field");
const clearSearchButton = document.getElementById("clear-search");
const resultsMessage = document.getElementById("results-message");

function displayLoadingMessage() {
    characterGrid.innerHTML = `
        <article class="status-card">
            <h3>Opening the Codex...</h3>
            <p>The companion records are being retrieved.</p>
        </article>
    `;
}

function displayErrorMessage() {
    characterGrid.innerHTML = `
        <article class="status-card">
            <h3>Unable to Open the Codex</h3>
            <p>
                The character records could not be retrieved from the database.
                Check the server and PostgreSQL connection.
            </p>
        </article>
    `;
}

function renderCharacters(characters) {
    characterGrid.innerHTML = "";

    // Add a helper class when there's exactly one result so CSS can
    // present a single card more compactly and centered.
    if (characters.length === 1) {
        characterGrid.classList.add("single-result");
    } else {
        characterGrid.classList.remove("single-result");
    }

    if (characters.length === 0) {
        characterGrid.innerHTML = `
            <article class="status-card">
                <h3>No Companions Found</h3>
                <p>
                    No character records matched your search.
                    Try another term or search category.
                </p>
            </article>
        `;

        return;
    }

    characters.forEach((character) => {
        const card = document.createElement("article");
        card.classList.add("character-card");

        card.innerHTML = `
            <img
                src="${character.image}"
                alt="Portrait of ${character.name}"
                class="character-image"
            >

            <div class="card-header">
                <h3>${character.name}</h3>

                <span class="difficulty-badge">
                    ${character.difficulty}
                </span>
            </div>

            <div class="character-info">
                <p>
                    <strong>Race:</strong>
                    ${character.race}
                </p>

                <p>
                    <strong>Class:</strong>
                    ${character.classType}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${character.role}
                </p>
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
}

async function loadCharacters(search = "", field = "name") {
    displayLoadingMessage();

    try {
        const queryParameters = new URLSearchParams();

        if (search) {
            queryParameters.set("search", search);
            queryParameters.set("field", field);
        }

        const queryString = queryParameters.toString();

        const endpoint = queryString
            ? `/api/characters?${queryString}`
            : "/api/characters";

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const characters = await response.json();

        renderCharacters(characters);

        if (search) {
            resultsMessage.textContent =
                `${characters.length} result(s) found for "${search}".`;
        } else {
            resultsMessage.textContent =
                `${characters.length} companions available in the codex.`;
        }
    } catch (error) {
        console.error("Failed to load characters:", error);

        resultsMessage.textContent = "";
        displayErrorMessage();
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const search = searchInput.value.trim();
    const field = searchField.value;

    loadCharacters(search, field);
});

clearSearchButton.addEventListener("click", () => {
    searchForm.reset();
    searchInput.focus();
    loadCharacters();
});

loadCharacters();