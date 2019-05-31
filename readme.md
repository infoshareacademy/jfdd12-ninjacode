# Feature 24
## sekcja hero

 - duże zdjęcie na całą szerokość strony (cashBake.png)

 - jeden duży tekstem na zdjęciu

 - dwa zdania opisu

 - odniesienie do formularza (jeśli istnieje)

# Kolory
## Twisted Spot Palette

wykorzystana paleta kolorów: [Link](https://mycolor.space/?hex=%23845EC2&sub=1)

- color: #845EC2;
- color: #00C9A7;
- color: #C4FCEF;
- color: #4D8076;

## dim background image
przyciemnienie obrazka w tle za pomocą css na dwa sposoby

1. z-index -- w html div.overlay i ustawianie z-index dla kontenerow

```` css
.slogan-page>.overlay{

    background-color: rgba(0,0,0,.5);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
}

.slogan-page>.name-app{
    font-family: "Pacifico", cursive;
    color: var(--main-color-1);
}
.slogan-page > div,
.slogan-page > h1,
.slogan-page > p,
.slogan-page > .name-app {
    z-index: 2;
}
````

2. linear-gradient

``` css
background:
        /* top, transparent black, faked with gradient */ 
        linear-gradient(
          rgba(0, 0, 0, 0.7), 
          rgba(0, 0, 0, 0.7)
        ),
        /* bottom, image */
        url("img/background_hero.png");
````


3. dodałem variables na kolorystykę
https://caniuse.com/#search=var()
https://www.w3schools.com/css/css3_variables.asp

