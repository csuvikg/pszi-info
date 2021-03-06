# pszi-info - Pszichoterápiás ellátótérkép

A mentális egészség témaköre gyakran tabusított téma. Sok rászoruló azért
nem jut megfelelő ellátáshoz, mert nem ismeri az intézményi hálót, annak
belépési pontjait, hozzáférhetőségét. Az projekt egy olyan nyilvánosan
elérhető progresszív webalkalmazás, amiben az érdeklődők hozzáférhető, 
társadalombiztosító által támogatott, igényeiknek megfelelő pszichiátriai 
és pszichoterápiás ellátóhelyeket találhatnak. A felület a wikipedián
ismerthez hasonló, közösségi adminisztráción alapul.

## Funkcionális követelmények

- a látogatónak lehetősége van a társadalombiztosítás által finanszírozott 
  mentálhigiénés ellátóhelyek keresése, szűrése többféle szempont szerint 
  (pl. település, ellátási körzet, célcsoport)
- a keresést és a találatok megjelenítését térkép segíti, ami az alkalmazás
  felhasználó felületének központi eleme
- az intézménykeresőn túl információs portál, cikkgyűjtemény segíti az 
  intézményrendszerben való tájékozódást
- a látogatónak lehetősége van hiányzó ellátóhelyek ajánlására
- a látogatónak lehetősége van ajánlatot tenni a meglévő ellátóhelyek 
  adatainak frissítésére
- egy felületen keresztül ezen javaslatok elbírálhatók a megfelelő jogkörrel
  rendelkező felhasználók által
- egy felületen keresztül a szerkesztőknek lehetőségük van az ellátóhely-adatok
  könnyű szerkesztésére, így azok karbantartása csak alapszintű számítógépes 
  ismereteket kíván
- egy adminfelületen keresztül lehetőség van a tudástár frissítésére
- szerkesztők olyan felhasználókból válhatnak, akik megfelelő számú, a többi
  szerkesztő által elfogadott javaslatot tettek
- szerzővé pályázat útján, egyéni elbírálás szerint válik valaki

## Nem funkcionális követelmények

- az oldal könnyen kezelhető, ergonómikus
- az oldalbetöltés, a lekérdezések gyorsak
- az alkalmazás különböző képernyőméreteken is megfelelően működik
- az alkalmazás offline-first szemléletű, az alapfunkciók használata az 
  első betöltés után nem igényelnek internetkapcsolatot

## Szakterületi fogalomjegyzék

- ellátóhely:
  - szolgáltatást nyújtó intézmény
- pszichoterápia:
  - a kommunikáció segítségével végzett gyógyító módszerek gyűjtőfogalma

## Szerepkörök

- anonim felhasználó:
  - böngészheti, szűrheti, keresheti az intézmények listáját
  - olvashatja az oldalon közzétett cikkeket
  - regisztrálhat az oldalon
- regisztrált felhasználó:
  - javasolhatja új intézmény felvételét
  - javasolhat módosítást intézményi adatokban
- szerkesztő:
  - elbírálhatja a javasolt intézményeket
  - elbírálhatja a javasolt változtatásokat
  - új intézményt adhat meg
  - módosíthatja az intézmények adatait
- szerző:
  - cikkeket írhat, melyek jóváhagyás után kikerülnek az oldalra
- adminisztrátor
  - jogosultságokat kezel
  - cikkeket hagy jóvá
