document.addEventListener('DOMContentLoaded', function() {
    const wordInput = document.getElementById('wordInput');
    const searchButton = document.getElementById('searchButton');
    const resultDiv = document.getElementById('result');

    let phoneticsText = document.querySelector('#ph-text');
    let phoneticsAudio = document.querySelector('#ph-audio');
    let originText = document.querySelector('#origin');
    
    let exclamationSection = document.querySelector('#exclamation');
    let nounSection = document.querySelector('#noun');
    let verbSection = document.querySelector('#verb');

    searchButton.addEventListener('click', searchWord);
    wordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWord();
        }
    });

    function searchWord() {
        const word = wordInput.value.trim();
        if (!word) {
            showError("Please enter a word to search");
            return;
        }

        resetDisplay();
        
        resultDiv.innerHTML = '<p style="text-align: center;">Loading...</p>';
        resultDiv.style.display = 'block';

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(response => {
                if (!response.ok) {
                    throw new Error('Word not found');
                }
                return response.json();
            })
            .then(data => {
                resetStructure();
                displayResults(data);
            })
            .catch(error => {
                showError(error.message === 'Word not found' ? 
                    `Sorry, we couldn't find definitions for "${word}"` : 
                    'An error occurred while fetching the data. Please try again later.');
            });
    }

    function displayResults(data) {
        const wordData = data[0];

        if (wordData.phonetics && wordData.phonetics.length > 0) {
            const phoneticWithAudio = wordData.phonetics.find(ph => ph.audio);
            
            if (phoneticWithAudio) {
                phoneticsText.textContent = `Text: ${phoneticWithAudio.text || ''}`;
                phoneticsAudio.src = phoneticWithAudio.audio;
                phoneticsAudio.style.display = 'block';
            } else {
                const firstPhonetic = wordData.phonetics[0];
                phoneticsText.textContent = `Text: ${firstPhonetic.text || ''}`;
                phoneticsAudio.style.display = 'none';
            }
        } else {
            document.getElementById('Phonetics').style.display = 'none';
        }

        if (wordData.meanings && wordData.meanings.length > 0) {
            exclamationSection.style.display = 'none';
            nounSection.style.display = 'none';
            verbSection.style.display = 'none';

            wordData.meanings.forEach(meaning => {
                const partOfSpeech = meaning.partOfSpeech.toLowerCase();
                let section;

                if (partOfSpeech === 'exclamation') {
                    section = exclamationSection;
                } else if (partOfSpeech === 'noun') {
                    section = nounSection;
                } else if (partOfSpeech === 'verb') {
                    section = verbSection;
                } else {
                    section = createPartOfSpeechSection(partOfSpeech);
                }

                if (section) {
                    section.style.display = 'block';
                    
                    if (meaning.definitions && meaning.definitions.length > 0) {
                        const definition = meaning.definitions[0];
                        section.querySelector('#definition').textContent = `Definition: ${definition.definition || ''}`;
                        
                        if (definition.example) {
                            section.querySelector('#example').textContent = `Example: "${definition.example}"`;
                            section.querySelector('#example').style.display = 'block';
                        } else {
                            section.querySelector('#example').style.display = 'none';
                        }
                    }

                    if (meaning.synonyms && meaning.synonyms.length > 0) {
                        section.querySelector('#synonyms').textContent = `Synonyms: ${meaning.synonyms.join(', ')}`;
                        section.querySelector('#synonyms').style.display = 'block';
                    } else {
                        section.querySelector('#synonyms').style.display = 'none';
                    }

                    if (meaning.antonyms && meaning.antonyms.length > 0) {
                        section.querySelector('#antonyms').textContent = `Antonyms: ${meaning.antonyms.join(', ')}`;
                        section.querySelector('#antonyms').style.display = 'block';
                    } else {
                        section.querySelector('#antonyms').style.display = 'none';
                    }
                }
            });
        }

        if (wordData.origin) {
            originText.textContent = `Origin: ${wordData.origin}`;
            originText.style.display = 'block';
        } else {
            originText.style.display = 'none';
        }

        resultDiv.style.display = 'block';
    }

    function createPartOfSpeechSection(partOfSpeech) {
        const existingSection = document.getElementById(partOfSpeech);
        if (existingSection) return existingSection;

        const partOfSpeechContainer = document.getElementById('partOfSpeech');
        
        const section = document.createElement('section');
        section.id = partOfSpeech;
        
        const heading = document.createElement('h4');
        heading.textContent = partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1);
        
        const definition = document.createElement('p');
        definition.id = 'definition';
        
        const example = document.createElement('p');
        example.id = 'example';
        
        const synonyms = document.createElement('p');
        synonyms.id = 'synonyms';
        
        const antonyms = document.createElement('p');
        antonyms.id = 'antonyms';
        
        section.appendChild(heading);
        section.appendChild(definition);
        section.appendChild(example);
        section.appendChild(synonyms);
        section.appendChild(antonyms);
        
        partOfSpeechContainer.appendChild(section);
        
        return section;
    }

    function showError(message) {
        resetDisplay();
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        resultDiv.innerHTML = '';
        resultDiv.appendChild(errorElement);
        resultDiv.style.display = 'block';
    }

    function resetDisplay() {
        resultDiv.innerHTML = '';
    }

    function resetStructure() {
        resultDiv.innerHTML = `
        <section id="Phonetics">
            <h2>Phonetics</h2>
            <p id="ph-text">text: </p>
            <audio id="ph-audio" controls></audio>
        </section>
        
        <section id="Meanings">
            <h2>Meanings</h2>
            <h3>Part of Speech</h3>
            <section id="partOfSpeech">
                <section id="exclamation">
                    <h4>Exclamation</h4>
                    <p id="definition">Definition: </p>
                    <p id="example">Example: </p>
                    <p id="synonyms">Synonyms: </p>
                    <p id="antonyms">Antonyms: </p>
                </section>
                <section id="noun">
                    <h4>Noun</h4>
                    <p id="definition">Definition: </p>
                    <p id="example">Example: </p>
                    <p id="synonyms">Synonyms: </p>
                    <p id="antonyms">Antonyms: </p>
                </section>
                <section id="verb">
                    <h4>Verb</h4>
                    <p id="definition">Definition: </p>
                    <p id="example">Example: </p>
                    <p id="synonyms">Synonyms: </p>
                    <p id="antonyms">Antonyms: </p>
                </section>
            </section>
        </section>
        
        <p id="origin">Origin: </p>
        `;

        phoneticsText = document.querySelector('#ph-text');
        phoneticsAudio = document.querySelector('#ph-audio');
        originText = document.querySelector('#origin');
        exclamationSection = document.querySelector('#exclamation');
        nounSection = document.querySelector('#noun');
        verbSection = document.querySelector('#verb');
    }
});