const loadData= async()=>{
    const fetchData = await fetch('data.json');
    const results = await fetchData.json()
    
    return results; 
}

const loadSkills = async(data)=>{
    
    const container = document.querySelector('.skills-content')
    const list = data.map((dt,index) =>{
        return `<div class="progress">
            <span class="skill">${dt}</span>
        </div>`
    })
    container.innerHTML = list.join(" ");
}

const loadExperiences = async(data)=>{
    
    const container = document.querySelector('.experience-container')
    const list = data.map((dt,index) =>{
        let jobDesks = dt.jobDesks.map(desk =>{
            return `<li>${desk}</li>`
        }).join(" ")
        return `<div class="resume-item">
        <h4>${dt.company}</h4>
        <h5>${dt.date}</h5>
        <p><em>${dt.jobTitle}</em></p>
        <p>
        <ul>
            ${jobDesks}
        </ul>
        </p>
    </div>`
    })
    
    container.innerHTML = list.join(" ");
    
}

const loadWorks = async(data)=>{
 
    const container = document.querySelector('.portfolio-container');
    const list = data.map((dt,index) =>{
        return `
        <div class="col-lg-4 col-md-6 portfolio-item relative filter-${dt.type}">
          <div class="portfolio-wrap">
            <img src="assets/img/portfolio/black-logo.jpg" class="img-fluid" alt="">
            <div class="portfolio-info">
              <h4>${dt.title}</h4>
              <p>${dt.type} APP</p>
              <div class="portfolio-links">
                <a href="portfolio-details.html?id=${index}" data-gallery="portfolioDetailsGallery" data-glightbox="type: external" class="portfolio-details-lightbox" title="Portfolio Details"><i class="bx bx-link"></i></a>
              </div>
            </div>
          </div>
        </div>`
    })
    
    container.innerHTML = list.join(" ");
    
}

async function reInitTemplate() {
  // Re-init Isotope untuk portfolio
  
  if (typeof Isotope !== 'undefined') {
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer) {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
      });

      const portfolioFilters = document.querySelectorAll('#portfolio-flters li');
      portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function (e) {
          e.preventDefault();
          portfolioFilters.forEach(el => el.classList.remove('filter-active'));
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter'),
          });
        });
      });
    }
  }

  // Re-init GLightbox untuk portfolio details
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.portfolio-details-lightbox', width: '90%', height: '90vh' });
  }
}


const initPage = async()=>{
    const data = await loadData();

    await loadSkills(data.skills)
    await loadExperiences(data.experiences)
    await loadWorks(data.portfolio)

    setTimeout(async() => {
      await reInitTemplate()
    }, 100);
}