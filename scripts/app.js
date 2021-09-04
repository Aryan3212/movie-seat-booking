const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();
// Functions

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // console.log(selectedSeats)
    const seatsIndex = [...selectedSeats].map((seat)=>[...seats].indexOf(seat))
    // console.log(seatsIndex)

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;
}

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMoviePrice', moviePrice);
    localStorage.setItem('selectedMovieIndex', movieIndex);
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log("slecece"+selectedSeats);
    if (selectedSeats!== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) !== -1){
                seat.classList.toggle('selected')
            }
        })
    }
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if(selectedMoviePrice !== null) {
        movieSelect.value = selectedMoviePrice;
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
    updateSelectedCount();
}
// Event Listeners

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


container.addEventListener('click', e=>{
    const clickedClassList = e.target.classList;
    const isUnoccupiedSeat = clickedClassList.contains('seat') && !clickedClassList.contains('occupied');
    if(isUnoccupiedSeat){
        clickedClassList.toggle('selected');

        updateSelectedCount();
    }
})