$(document).ready(function () {
  "use strict";
  //All elements from the page

  //menu links
  const main_menu = $("#main-menu");
  const hamburger_btn = $("#hamburger");
  const mercury_link = $("#mercury-link");
  const venus_link = $("#venus-link");
  const earth_link = $("#earth-link");
  const mars_link = $("#mars-link");
  const jupiter_link = $("#jupiter-link");
  const saturn_link = $("#saturn-link");
  const uranus_link = $("#uranus-link");
  const neptune_link = $("#neptune-link");

  //displays
  const planet_image = $("#planet-image");
  const geology_image = $("#geology-image");
  const planet_title_display = $("#planet-title-display");
  const planet_description_display = $("#planet-description-display");
  const wikipedia_link = $("#wikipedia-link");

  //planet-menu links
  const overview_link = $("#overview-link");
  const structure_link = $("#structure-link");
  const geology_link = $("#geology-link");

  //facts displays
  const rotation_display = $("#rotation-display");
  const revolution_display = $("#revolution-display");
  const radius_display = $("#radius-display");
  const temperature_display = $("#temperature-display");

  //Get the data from external json file
  const json = $.getJSON("./data.json", function (response) {
    //Save all the planets in variables for quick access
    const mercury_json = response[0];
    const venus_json = response[1];
    const earth_json = response[2];
    const mars_json = response[3];
    const jupiter_json = response[4];
    const saturn_json = response[5];
    const uranus_json = response[6];
    const neptune_json = response[7];
    //Initialize with Earth page opened
    updatePage(earth_json);
    updatePlanet(earth_json);

    //Change page when click on the planet-link AND pass same planet as an argument to the little-menu function
    //If mobile - close the menu after clicking
    mercury_link.click(function () {
      updatePage(mercury_json);
      updatePlanet(mercury_json);
      toggleMenu();
    });
    venus_link.click(function () {
      updatePage(venus_json);
      updatePlanet(venus_json);
      toggleMenu();
    });
    earth_link.click(function () {
      updatePage(earth_json);
      updatePlanet(earth_json);
      toggleMenu();
    });
    mars_link.click(function () {
      updatePage(mars_json);
      updatePlanet(mars_json);
      toggleMenu();
    });
    jupiter_link.click(function () {
      updatePage(jupiter_json);
      updatePlanet(jupiter_json);
      toggleMenu();
    });
    saturn_link.click(function () {
      updatePage(saturn_json);
      updatePlanet(saturn_json);
      toggleMenu();
    });
    uranus_link.click(function () {
      updatePage(uranus_json);
      updatePlanet(uranus_json);
      toggleMenu();
    });
    neptune_link.click(function () {
      updatePage(neptune_json);
      updatePlanet(neptune_json);
      toggleMenu();
    });
  });

  //All the functions

  // Update the page when choose a planet
  function updatePage(planet) {
    //Update displays

    //When changing planets the little menu stays on the same link
    if (structure_link.hasClass("planet-menu--item__active")) {
      planet_image.attr("src", planet.images.internal);
    } else {
      planet_image.attr("src", planet.images.planet);
    }
    geology_image.attr("src", planet.images.geology);
    planet_title_display.text(`${planet.name}`);
    planet_description_display.text(`${planet.overview.content}`);
    wikipedia_link.attr("href", `${planet.overview.source}`);

    //update facts
    rotation_display.text(`${planet.rotation}`);
    revolution_display.text(`${planet.revolution}`);
    radius_display.text(`${planet.radius}`);
    temperature_display.text(`${planet.temperature}`);

    //Remove previous class name
    $("body").removeClass();
    //Add class name to the body, in order to change the color scheme
    $("body").addClass(`${planet.name}`.toLowerCase());

    //Add styling to the active planet link
    let linked_planet = `.menu--item__${planet.name}`.toLowerCase();
    $(linked_planet)
      .addClass("menu--item__active")
      .siblings()
      .removeClass("menu--item__active");
  }

  // Update info when choosing different label
  function updatePlanet(planet) {
    geology_link.click(function () {
      //Add styling to the active link & remove styling from siblings
      $(this).siblings().removeClass("planet-menu--item__active");
      $(this).addClass("planet-menu--item__active");
      //Add surface image to the overview image
      planet_image.attr("src", planet.images.planet);
      geology_image.attr("src", planet.images.geology);
      geology_image.css("display", "block");
      //Show corresponding text and link
      planet_description_display.text(planet.geology.content);
      wikipedia_link.attr("href", planet.geology.source);
    });
    overview_link.click(function () {
      $(this).siblings().removeClass("planet-menu--item__active");
      geology_image.css("display", "none");
      $(this).addClass("planet-menu--item__active");
      //Remove additional surface image
      geology_image.attr("src", "");
      planet_image.attr("src", planet.images.planet);
      //Show corresponding text & link
      planet_description_display.text(planet.overview.content);
      wikipedia_link.attr("href", planet.overview.source);
    });
    structure_link.click(function () {
      $(this).siblings().removeClass("planet-menu--item__active");
      $(this).addClass("planet-menu--item__active");
      geology_image.css("display", "none");
      //Remove additional surface image
      geology_image.attr("src", "");
      planet_image.attr("src", planet.images.internal);
      //Show corresponding text & link
      planet_description_display.text(planet.structure.content);
      wikipedia_link.attr("href", planet.structure.source);
    });
  }

  //Make menu visible function
  function toggleMenu() {
    let width = $(window).width();
    //Only toggle the menu if on mobile
    if (width < 700) {
      if (main_menu.hasClass("active")) {
        main_menu.slideToggle();
        hamburger_btn.css("opacity", "1");
        main_menu.removeClass("active");
      } else {
        main_menu.slideToggle();
        main_menu.css("display", "flex");
        hamburger_btn.css("opacity", "0.5");
        main_menu.addClass("active");
      }
    }
  }
  //Toggle the menu on mobile
  hamburger_btn.on("click", function () {
    toggleMenu();
  });
  //Prevent disappearing of the menu on resizing
  $(window).resize(function () {
    let width = $(window).width();
    if (width > 700) {
      main_menu.show();
    } else if (width < 700) {
      main_menu.hide();
    }
  });
});
