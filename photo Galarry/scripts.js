document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("caption");
  const close = document.getElementById("close");

  const images = [
    { src: "photo.jpg", alt: "Group photo in Machikhanen Haijen " },
    { src: "photo1.jpg", alt: "Group photo in Machikhanen Haijen" },
    { src: "Tehseen akbar/new.jpg ", alt: "Photo  taken by Tehseen, showcasing the scenic beauty of the region" },
    { src: "Tehseen akbar/new1.jpg", alt: "Photo of Gulmarg, taken by Tehseen, showcasing the scenic beauty of the region" },
    { src: "Tehseen akbar/new2.jpg", alt: "Photo of Doodhpathri, taken by Tehseen, showcasing the scenic beauty of the region" },
    { src: "Tehseen akbar/new3.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new4.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new17.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new7.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new8.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new18.jpg", alt: "Photo of tehseen Bin Akbar" },
    { src: "Tehseen akbar/new22.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new33.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new34.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new36.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new39.jpg", alt: "Photo taken by tehseen Bin Akbar" },

    { src: "photo3.jpg", alt: "photo of Sahil and Sameem taken by Zuhaib at Dharkhal Haijen" },
    { src: "photo4.jpg", alt: "photo of Sahil and Sameem taken by ZUhaib at Mandikhal Haijen" },
    { src: "photo5.jpg", alt: "photo of Sameem" },
    // { src: "photo6.jpg", alt: "Group photo at Dharkhal" },
    { src: "photo7.jpg", alt: "Group photo at Dharkhal" },
    { src: "photo8.jpg", alt: "photo of Aqib taken and edited by Zuhaib" },
    { src: "Aqib.jpg", alt: "photo of Aqib taken by Zuhaib"},
    { src: "muba.jpg", alt: "photo of Mubashir "},
    { src: "muba1.jpg", alt: "photo of Mubashir "},
    { src: "muba2.jpg", alt: "photo of Mubashir "},
    { src: "photo9.jpg", alt: "photo of Faisal taken by Zuahib" },
    { src: "photo10.jpg", alt: "photo of myself taken by Aqib at Dharkhal" },
    { src: "photo10.2.jpg", alt: "photo of myself taken by Aqib at Dharkhal" },
    { src: "photo11.jpg", alt: "photo of Sahil taken by Aqib " },
    { src: "photo13.jpg", alt: "Group photo at Badipoora Widder while eatting chicken" },
    { src: "photo14.jpg", alt: "Photo of Musaib at Machikhanen" },
    { src: "photo15.jpg", alt: "photo of Tatakoti MT taken By Mursalien" },
    { src: "photo16.jpg", alt: "photo taken by Aqib at Yousmarg" },
    { src: "Tehseen akbar/new6.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new12.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new16.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new20.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new26.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new31.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new32.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new37.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new38.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new40.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new44.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new45.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new46.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new47.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new50.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new51.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new52.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new53.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new54.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new59.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new60.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new65.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new66.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new67.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new68.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new70.jpg", alt: "Photo taken by tehseen Bin Akbar" },
    { src: "Tehseen akbar/new79.jpg", alt: "Photo of Sahil Javeed" },
    { src: "photo30.jpg", alt: "Photo of Zubair at Mandikhal Haijen" },
    { src: "zubair.jpg", alt: "Photo of Zubair " },
    { src: "zubair1.jpg", alt: "Photo of Zubair " },
    { src: "Tehseen akbar/new69.jpg", alt: "Photo of tehseen" },
    { src: "Tehseen akbar/new72.jpg", alt: "Photo of Shahid Khan" },
    { src: "Tehseen akbar/new77.jpg", alt: "Photo of Shahid Khan" },
    { src: "janna (1).jpg", alt: "Photo of Tehseen Bin Akbar" },
    { src: "janna (2).jpg", alt: "Photo of Tehseen Bin Akbar" },
    { src: "janna (3).jpg", alt: "Photo of Tehseen Bin Akbar" },
    { src: "janna (4).jpg", alt: "Photo of Tehseen Bin Akbar" },
    { src: "janna (5).jpg", alt: "Photo of Tehseen Bin Akbar" },

    
    { src: "photo18.jpg", alt: "photo of chicken cooked at the Mandikhal Haijen" },
    { src: "photo19.jpg", alt: "photo of chicken cooked at the Mandikhal Haijen" },
    { src: "photo20.jpg", alt: "photo of chicken cooked at the Mandikhal Haijen" },
    { src: "photo21.jpg", alt: "photo of chicken cooked at the Mandikhal Haijen" },
    { src: "photo22.jpg", alt: "photo of chicken cooked at the Mandikhal Haijen" },
    { src: "photo23.jpg", alt: "photo of chicken cooked in the Badipoora Widder" },
    { src: "photo24.jpg", alt: "photo of chicken cooked in the Badipoora Widder" },
    { src: "photo25.jpg", alt: "photo of Dharkhal" },
    { src: "photo26.jpg", alt: "photo of Nilnag Lake taken by Aqib" },
    { src: "photo27.jpg", alt: "photo of Nilnag Lake taken by Aqib" },
    { src: "photo28.jpg", alt: "photo of Nilnag Lake taken by Aqib" },
    { src: "photo29.jpg", alt: "photo of chicken cooked in the Badipoora Widder" },
    { src: "edit1 (1).jpg", alt: "photo of Machikhanen taken and edited by Zuhaib" },
    { src: "edit1 (2).jpg", alt: "Image 13 description" },
    // { src: "haijen4.jpg", alt: "Image 13 description" },
    { src: "edit1 (4).jpg", alt: "photo taken by Zuhaib at Haijen " },
    { src: "edit1 (3).jpg", alt: "photo taken by Zuhaib at Haijen " },
    { src: "edit1 (5).jpg", alt: "photo taken by Zuhaib at Haijen " },
    { src: "edit1 (6).jpg", alt: "photo taken by Zuhaib at Haijen " },
    { src: "edit1 (7).jpg", alt: "photo taken by Zuhaib at Haijen " },
    { src: "edit1 (8).jpg", alt: "photo taken by Zuhaib at Haijen " },
    { src: "edit1 (9).jpg", alt: "photo taken by Zuhaib at Haijen " },
    { src: "edit1 (10).jpg", alt: "photo taken by Zuhaib at Haijen " },
    { src: "edit1 (11).jpg", alt: "photo taken by Zuhaib" },
    { src: "edit1 (12).jpg", alt: "photo taken by Zuhaib" },
    { src: "edit1 (13).jpg", alt: "photo taken by Zuhaib" },
    // { src: "haijen17.jpg", alt: "Image 13 description" },
    // { src: "umer.jpg", alt: "Photo of Umer at Gym" },
    { src: "Haseeb.webp", alt: "Photo of Haseeb" },

    { src: "Haziq.webp", alt: "photo of Haziq" },
    { src: "Haziq1.jpg", alt: "photo of Haziq" },
    { src: "New2.jpeg", alt: "photo of Tawseep" },
    { src: "New3.jpeg", alt: "photo of Tawseep" },
    { src: "tawsep.jpg", alt: "photo of Tawseep" },
    { src: "tawseep.jpg", alt: "photo of Tawseep" },
    { src: "Bilmam.jpg", alt: "photo of Bilal Bhat" },
    { src: "Bilmam2.jpg", alt: "photo of Bilal Bhat" },
    { src: "Faisal.jpg", alt: "photo of Furqan" },
    { src: "Faisal1.jpg", alt: "photo of Furqan" },
    { src: "Faisal2.jpg", alt: "photo of Furqan" },
    { src: "Faisal3.jpg", alt: "photo of Furqan" },
    { src: "Faisal4.jpg", alt: "photo of Furqan" },
    { src: "Faisal5.jpeg", alt: "photo of Furqan" },
    { src: "Naveed.webp", alt: "photo of Naveed" },
    { src: "Naveed1.webp", alt: "photo of Naveed" },
    { src: "Naveed2.webp", alt: "photo of Naveed" },
    { src: "tehseen (1).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (2).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (3).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (4).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (5).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (6).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (7).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (8).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (9).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (10).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (11).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (12).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (13).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "tehseen (14).jpg", alt: "photo taken by Tehseen Bin Akbar" },
    { src: "Sameem4.webp", alt: "photo of Sameem" },
    { src: "Sameem1.webp", alt: "photo of Sameem" },
    { src: "Sameem2.webp", alt: "photo of Sameem" },
    { src: "Sameem3.webp", alt: "photo of Sameem" },
    { src: "Farhan (1).jpg", alt: "photo of Farhan" },
    { src: "Farhan (2).jpg", alt: "photo of Farhan" },
    { src: "Farhan (3).jpg", alt: "photo of Farhan" },
    

  
  ];

  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.loading = "lazy";
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = image.src;
      captionText.innerHTML = image.alt;
    });
    gallery.appendChild(img);
  });

  close.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
