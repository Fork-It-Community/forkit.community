import rouenImage from "/public/events/weekend-rouen.jpg";
import {
  CarFront,
  BusFront,
  TramFront,
  BedDouble,
  Home,
  Landmark,
  Drama,
  Trees,
  ShoppingBag,
  BadgeAlert,
  Music,
  PartyPopper,
  Wine,
  Utensils,
} from "lucide-react";
import Image from "next/image";
export default function WeekendPage() {
  return (
    <div className="prose prose-sm prose-invert mx-auto p-6 text-white md:prose-base prose-headings:scroll-m-10 prose-headings:font-heading prose-headings:text-primary prose-h3:flex prose-h3:items-center prose-h3:gap-2 prose-h3:font-bold prose-h3:text-white">
      <h1>
        Rouen, <span className="text-white">France</span>
      </h1>
      <div>
        <h2>A Weekend Guide</h2>
        <div className="gap-4 md:flex md:flex-row-reverse">
          <Image
            src={rouenImage}
            alt="Rouen"
            className="h-full rounded-md"
            width={300}
            height={150}
          />
          <p>
            Rouen perfectly captures the essence of
            <strong> Norman charm and modern vibrancy</strong>, offering an
            array of cool spots to explore. Whether you prefer trendy cocktails
            or chilled beers on a terrace, the city&apos;s lively bars and clubs
            cater to every taste. Culturally, Rouen is{" "}
            <strong>always buzzing</strong> with events, from art exhibitions to
            live concerts.
          </p>
        </div>
        <p>
          Looking for some fresh air? <strong>The Seine riverbanks</strong> are
          perfect for a leisurely stroll or simply relaxing. Food enthusiasts
          will find <strong>local restaurants and shops</strong> ready to
          tantalize their taste buds. In Rouen, the old meets the new, all
          within a <strong>friendly atmosphere.</strong>
        </p>
      </div>
      <div>
        <h2>Getting to Rouen ?</h2>
        <div>
          <h3>
            <TramFront />
            By train
          </h3>

          <p>
            Over <strong>25 trains</strong> daily from
            <strong> Paris Saint-Lazare</strong>.
            <br />
            Average journey time : <strong>1h20</strong> for around
            <strong> 20</strong> euros.
          </p>
        </div>
        <div>
          <h3>
            <CarFront />
            By car
          </h3>
          <p>
            <strong>A13, A28, A29, A150 </strong> all lead you straight to Rouen
            from various directions.
            <br />
            However, driving and parking in Rouen can be tricky. With
            <strong> great public transport </strong> connections, we recommend
            leaving your car behind for the weekend!
          </p>
        </div>
        <div>
          <h3>
            <BusFront />
            By bus
          </h3>
          <p>
            From <strong>Paris, Caen, Lille,</strong> and many other French
            cities, companies like{" "}
            <a href="https://www.flixbus.fr" target="_blank" rel="noreferer">
              www.flixbus.fr
            </a>{" "}
            and{" "}
            <a href="https://www.blablacar.fr" target="_blank" rel="noreferer">
              www.blablacar.fr
            </a>{" "}
            offer excellent connections to Rouen.
          </p>
        </div>
      </div>
      <div>
        <h2>Where to stay</h2>
        <div className="flex flex-col">
          <h3>
            <BedDouble />
            Hotels
          </h3>
          <ul>
            <li>
              <a
                href="https://www.booking.com/searchresults.fr.html?aid=2311236&label=fr-fr-booking-desktop-DCpBIW3k2%2AWIo8XuzMdB9AS652796013276%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9056148%3Ali%3Adec%3Adm&no_rooms=1&srpvid=359f3faa1ff200d2&highlighted_hotels=51151&checkin=2024-06-07&redirected=1&city=-1462807&hlrd=with_av&group_adults=2&source=hotel&group_children=0&checkout=2024-06-08&keep_landing=1&sid=47eee62d2a27250225c94332f4328564#hotelTmpl"
                target="_blank"
                rel="noreferer"
              >
                Hôtel Littéraire Gustave Flaubert, BW Signature Collection
              </a>
              <strong> (170 €/night)</strong>
            </li>
            <li>
              <a
                href="https://www.booking.com/searchresults.fr.html?aid=2311236&label=fr-fr-booking-desktop-DCpBIW3k2%2AWIo8XuzMdB9AS652796013276%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9056148%3Ali%3Adec%3Adm&no_rooms=1&srpvid=c0b53e98332501a2&highlighted_hotels=1756314&checkin=2024-06-07&redirected=1&city=-1462807&hlrd=with_av&group_adults=2&source=hotel&group_children=0&checkout=2024-06-08&keep_landing=1&sid=47eee62d2a27250225c94332f4328564#map_closed"
                target="_blank"
                rel="noreferer"
              >
                Ibis Styles Rouen Centre Cathédrale
              </a>
              <strong> (117 €/night)</strong>
            </li>
            <li>
              <a
                href="https://www.booking.com/searchresults.fr.html?aid=2311236&label=fr-fr-booking-desktop-DCpBIW3k2%2AWIo8XuzMdB9AS652796013276%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9056148%3Ali%3Adec%3Adm&no_rooms=1&srpvid=c0b53e98332501a2&highlighted_hotels=55271&checkin=2024-06-07&redirected=1&city=-1462807&hlrd=with_av&group_adults=2&source=hotel&group_children=0&checkout=2024-06-08&keep_landing=1&sid=47eee62d2a27250225c94332f4328564#hotelTmpl"
                target="_blank"
                rel="noreferer"
              >
                Hotel Dandy Rouen Centre
              </a>
              <strong> (105 €/night)</strong>
            </li>
            <li>
              <a
                href="https://www.booking.com/searchresults.fr.html?aid=2311236&label=fr-fr-booking-desktop-DCpBIW3k2%2AWIo8XuzMdB9AS652796013276%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9056148%3Ali%3Adec%3Adm&no_rooms=1&srpvid=a42d3ff8223a000d&highlighted_hotels=263600&checkin=2024-06-07&redirected=1&city=-1462807&hlrd=with_av&group_adults=2&source=hotel&group_children=0&checkout=2024-06-08&keep_landing=1&sid=47eee62d2a27250225c94332f4328564#hotelTmpl"
                target="_blank"
                rel="noreferer"
              >
                Les Initiés
              </a>
              <strong> (80 €/night)</strong>
            </li>
          </ul>
        </div>
        <div>
          <h3>
            <Home />
            Airbnb
          </h3>
          <p>
            Airbnb options are also available but book up fast.
            <br />
            Areas like
            <strong> La Gare, Vieux Marché, </strong> and{" "}
            <strong> Carmes St-Maclou </strong> are especially popular!
          </p>
        </div>
      </div>
      <div>
        <h2>What to do in Rouen</h2>
        <div className="md:grid md:grid-cols-2">
          <div>
            <h3>
              <Landmark />
              Historic Sites
            </h3>
            <ul>
              <li>Notre-Dame Cathedral</li>
              <li>Le Gros-Horloge</li>
              <li>Place du Vieux-Marché</li>
            </ul>
          </div>
          <div>
            <h3>
              <Drama />
              Museums and Culture
            </h3>
            <ul>
              <li>Museum of Fine Arts</li>
              <li>Pierre Corneille&apos;s birthplace</li>
            </ul>
          </div>
          <div>
            <h3>
              <Trees />
              Outdoor Activities
            </h3>
            <ul>
              <li>Walk along the Seine riverbanks</li>
              <li>Natural park of the Seine loops</li>
            </ul>
          </div>
          <div>
            <h3>
              <ShoppingBag />
              Shopping and Gastronomy
            </h3>
            <ul>
              <li>Main shopping streets</li>
              <li>Restaurants to savor Normandy&apos;s cuisine</li>
            </ul>
          </div>
        </div>
        <div>
          <h3>
            <BadgeAlert />
            Practical Tips
          </h3>
          <p>
            The city center is <strong>pedestrian-friendly</strong>. Good
            walking shoes are a must!
            <br />
            <strong>Main attractions</strong> are usually open between
            <strong> 10am and 7pm.</strong>
            <br />
            Being in Normandy, always pack <strong>a raincoat</strong> or
            <strong> umbrella!</strong>
          </p>
        </div>
      </div>
      <div>
        <h2>Local events and festivals for the weekend</h2>
        <div>
          <h3>
            <Music />
            <a
              href="https://www.visiterouen.com/patrimoines/art/festivals-au-coeur-du-patrimoine/festival-rush/"
              target="_blank"
              rel="noreferer"
            >
              Rush
            </a>
          </h3>
          <p>
            This summer kick-off music event in Rouen is a must!
            <br />
            Get ready to groove, dance, and dream from{" "}
            <strong>June 6th to 15th.</strong>
          </p>
        </div>
        <div>
          <h3>
            <PartyPopper />
            <a
              href="https://www.normandie-tourisme.fr/partenaires/d-day-festival-normandy/programme/"
              target="_blank"
              rel="noreferer"
            >
              D-Day Festival
            </a>
          </h3>
          <p>
            Celebrate freedom and the anniversary of the Allied landings in
            Normandy from <strong>June 1st to 16th.</strong> Expect parachuting,
            parades, concerts, historical reenactments, fireworks, exhibitions,
            and screenings.
          </p>
        </div>
      </div>
      <div>
        <h2>Dining and Bars</h2>
        <div className="md:grid md:grid-cols-2">
          <div>
            <h3>
              <Wine />
              Bars
            </h3>
            <ul>
              <li>Le Petit BAR Cocktails</li>
              <li>L’Absinthe (Cocktail)</li>
              <li>L’Antre du Malt (Bières craft)</li>
              <li>L’Underdogs (Bières craft)</li>
              <li>Le Vixen (Cocktail et bière)</li>
            </ul>
          </div>
          <div>
            <h3>
              <Utensils />
              Restaurants
            </h3>
            <ul className="md:grid md:grid-cols-2">
              <li>Café Hamlet</li>
              <li>Pasta Tinto</li>
              <li>Hai ba</li>
              <li>Rotomagus</li>
              <li>La Bekaa</li>
              <li>Le bisou</li>
              <li>La Bocelli</li>
              <li>Yu Yuan</li>
              <li>Nanako</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2>Estimated budget for a weekend in Rouen</h2>
        <p>
          Average accommodation cost : <strong>110€/night</strong>
          <br />
          Meal with a drink : <strong>25€</strong>
          <br />
          Tourist attraction prices : <strong>10€</strong>
        </p>
      </div>
    </div>
  );
}
