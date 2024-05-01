document.querySelector(".control-button span").onclick = function() {
    let urName = prompt('Write Your Name');
    if(urName == "" || urName == null) {
        document.querySelector('.info-container span').innerHTML = 'Unknown';
    }else {
        document.querySelector('.info-container span').innerHTML = urName.toUpperCase();
    }
    document.querySelector('.control-button').remove();
}

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);

let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block , index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
        flipBlock(block);
    })
})

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFilppedBlocks = blocks.filter(filppedBlock => filppedBlock.classList.contains('is-flipped'));
    if(allFilppedBlocks.length === 2) {
        stopClicking();
        checkMatchingBlocks(allFilppedBlocks[0], allFilppedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration)
}

function checkMatchingBlocks(frist , second) {
    let tries = document.querySelector('.tries span');
    if(frist.dataset.technology === second.dataset.technology) {
        frist.classList.remove('is-flipped');
        second.classList.remove('is-flipped');
        frist.classList.add('has-match');
        second.classList.add('has-match');
        document.getElementById('success').play();
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('has-match'));
        if (allFlippedBlocks.length === blocks.length) {
            finishGame();
        }        
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        document.getElementById('fail').play();
        setTimeout(() => {
            frist.classList.remove('is-flipped');
            second.classList.remove('is-flipped');
        }, duration)
    }
}

function finishGame() {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('main-div')
    let span = document.createElement('span');
    span.classList.add('reloud');
    let spanText = document.createTextNode('Good Game');
    span.appendChild(spanText);
    mainDiv.appendChild(span);
    span.onclick = function() {
        window.location.reload();
    }
    document.body.appendChild(mainDiv);

}

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}