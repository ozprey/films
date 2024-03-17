const apikey = 'api_key=9782bcec11edfd02dbd2f55b513f79b8';
const burl = 'https://api.themoviedb.org/3';
const imgurl = 'https://image.tmdb.org/t/p/w500'


let it = document.getElementById('form');
let st = document.getElementById('rope');
it.addEventListener('submit', (e) => {
    e.preventDefault();
    let mt = st.value;
    malabar(`${burl}/search/movie?query=${mt}&${apikey}`);
});
malabar(`${burl}/discover/movie?sort_by=popularity.desc&${apikey}`)


async function malabar(x) {
    try {
        document.querySelector('main').innerHTML = '';  //clearing previous search
        const fd = await fetch(x);  //1 FETCHED DATA
        const tj = await fd.json();  //2 JSON TO JS OBJECT
        const res = tj.results;    //3 REDUCED OBJECT WITH ONLY RESULTS
        const idcoll = Object.values(res).map(innerObj => innerObj.id);  //4 EXTRACTING ID PROPERTY OF REDUCED OBJECT
        console.log(idcoll);

        idcoll.forEach(e =>    {                   //5 LOOPING THROUGH EACH ID
            sabar(burl + `/movie/${e}?&` + apikey)
            console.log(e)}
            );
    } catch (error) {
        console.error('amigo',error)
        document.querySelector('main').innerHTML = 'NOT FOUND';
    }
}

//6 ON EACH ID
async function sabar(x) {
    try {
        const fd = await fetch(x);   //6.1 FETCHED DATA
        const tj = await fd.json();  //6.2 JSON TO JS OBJECT
        const { original_title,title, id, backdrop_path, runtime ,overview ,tagline} = tj;  //6.3 reduced js object WITH ONLY CERTAIN PROPS
        const mj = { original_title,title, id, backdrop_path,runtime,overview ,tagline};
          console.log(mj.overview);
        const dfd = document.createElement('div');  // CREATING DOM ELEMENT
        dfd.innerHTML= 
    `<div class="one">
    <div class="three"><span class="plot">${mj.overview}</span></div>
    <div class="to">
        <img src="${imgurl+mj.backdrop_path}" alt="${id}" onerror="this.onerror=null;this.style.display='none';>
    </div>
    <div class="textblock">
        <p class="title">${mj.title}</p>
        <p class="crd"><span class="year">${mj.original_title}</span><span class="ids"><i>${mj.id}</i></span><span
                class="duration">${mj.runtime} min</span>
        </p>
        <p class="tagline"><i>${mj.tagline}</i></p>

    </div>
</div>`



    document.querySelector('main').appendChild(dfd)   // APPENDING DOM ELEMENT
    } catch (error) { console.error('forty') }
}
