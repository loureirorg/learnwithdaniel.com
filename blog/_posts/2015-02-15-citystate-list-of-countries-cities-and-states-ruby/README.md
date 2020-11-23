---
title: "CityState Gem: Cities, states and countries in Ruby/Rails"
date: 2015-02-15
tags: ['Rails', 'Ruby', 'Gem']
author: Daniel Loureiro
---
Let's say you have a form asking for a city and state. How do you populate these fields?

This requirement is omnipresent in almost every website, and yet there's no library to deal with this.
<!-- more -->

Maybe it's a regional need, specific to my country, IDK, I just know that is very common for my clients to ask for a form with these fields. So, in my day-to-day programmer's life, I have to copy-and-paste snippets with a list of states and cities.

I usually do something like this:

```erb
<% states = {AK: "Alaska", AL: "Alabama", AR: "Arkansas", AZ: "Arizona", CA: "California", CO: "Colorado", CT: "Connecticut", DC: "District of Columbia", DE: "Delaware", FL: "Florida", GA: "Georgia", HI: "Hawaii", IA: "Iowa", ID: "Idaho", IL: "Illinois", IN: "Indiana", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", MA: "Massachusetts", MD: "Maryland", ME: "Maine", MI: "Michigan", MN: "Minnesota", MO: "Missouri", MS: "Mississippi", MT: "Montana", NC: "North Carolina", ND: "North Dakota", NE: "Nebraska", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NV: "Nevada", NY: "New York", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VA: "Virginia", VT: "Vermont", WA: "Washington", WI: "Wisconsin", WV: "West Virginia", WY: "Wyoming"} %>
<select name="form[state]">
  <% states.each do |key, value| %>
  <option value="<%= key %>"><%= value %></option>
  <% end %>
</select>
```

Of course, I use a list of states of my own country.

I do the same thing for the cities (I use a YAML file for them), which isn't a very neat solution – hard coding your data is never a neat solution. Actually, it is even worse, because new cities are created every month in my country (so, the city list gets easily outdated).

Looking for a better solution, I found this [Carmen Gem](https://github.com/jim/carmen), which provides a list of states from every country in the world, but unfortunately, it doesn't provide a list of cities. Also, it has a big and frightening warning that the gem is outdated.

To solve this problem, I created a gem called [city-state](https://github.com/loureirorg/city-state). This gem provides an easy way to get a list of all states of a country, and also a list of all cities from each state.

It has an auto-update mechanism, so I don't have to manually update the gem's database from time to time. This prevents it from getting outdated.

This gem uses the **MaxMind** database, a very popular database used on many websites – usually with the purpose of discovering the IP localization – and it's updated weekly. My logic is that each city/town in the world has at least one IP address assigned to it, making the IP database a reliable source of cities and states.

## Install

```ruby
# Gemfile
gem 'city-state'
```

## Usage

```ruby
CS.states(:us)
# => {:AK=>"Alaska", :AL=>"Alabama", :AR=>"Arkansas", :AZ=>"Arizona", :CA=>"California", :CO=>"Colorado", :CT=>"Connecticut", :DC=>"District of Columbia", :DE=>"Delaware", :FL=>"Florida", :GA=>"Georgia", :HI=>"Hawaii", :IA=>"Iowa", :ID=>"Idaho", :IL=>"Illinois", :IN=>"Indiana", :KS=>"Kansas", :KY=>"Kentucky", :LA=>"Louisiana", :MA=>"Massachusetts", :MD=>"Maryland", :ME=>"Maine", :MI=>"Michigan", :MN=>"Minnesota", :MO=>"Missouri", :MS=>"Mississippi", :MT=>"Montana", :NC=>"North Carolina", :ND=>"North Dakota", :NE=>"Nebraska", :NH=>"New Hampshire", :NJ=>"New Jersey", :NM=>"New Mexico", :NV=>"Nevada", :NY=>"New York", :OH=>"Ohio", :OK=>"Oklahoma", :OR=>"Oregon", :PA=>"Pennsylvania", :RI=>"Rhode Island", :SC=>"South Carolina", :SD=>"South Dakota", :TN=>"Tennessee", :TX=>"Texas", :UT=>"Utah", :VA=>"Virginia", :VT=>"Vermont", :WA=>"Washington", :WI=>"Wisconsin", :WV=>"West Virginia", :WY=>"Wyoming"}

CS.cities(:ak, :us)
# => ["Adak", "Akhiok", "Akiachak", "Akiak", "Akutan", "Alakanuk", "Ambler", "Anchor Point", "Anchorage", "Angoon", "Atqasuk", "Barrow", "Bell Island Hot Springs", "Bethel", "Big Lake", "Buckland", "Chefornak", "Chevak", "Chicken", "Chugiak", "Coffman Cove", "Cooper Landing", "Copper Center", "Cordova", "Craig", "Deltana", "Dillingham", "Douglas", "Dutch Harbor", "Eagle River", "Eielson Air Force Base", "Fairbanks", "Fairbanks North Star Borough", "Fort Greely", "Fort Richardson", "Galena", "Girdwood", "Goodnews Bay", "Haines", "Homer", "Hooper Bay", "Juneau", "Kake", "Kaktovik", "Kalskag", "Kenai", "Ketchikan", "Kiana", "King Cove", "King Salmon", "Kipnuk", "Klawock", "Kodiak", "Kongiganak", "Kotlik", "Koyuk", "Kwethluk", "Levelock", "Manokotak", "May Creek", "Mekoryuk", "Metlakatla", "Mountain Village", "Nabesna", "Naknek", "Nazan Village", "Nenana", "New Stuyahok", "Nikiski", "Ninilchik", "Noatak", "Nome", "Nondalton", "Noorvik", "North Pole", "Northway", "Old Kotzebue", "Palmer", "Pedro Bay", "Petersburg", "Pilot Station", "Point Hope", "Point Lay", "Prudhoe Bay", "Russian Mission", "Sand Point", "Scammon Bay", "Selawik", "Seward", "Shungnak", "Sitka", "Skaguay", "Soldotna", "Stebbins", "Sterling", "Sutton", "Talkeetna", "Teller", "Thorne Bay", "Togiak", "Tok", "Toksook Bay", "Tuntutuliak", "Two Rivers", "Unalakleet", "Unalaska", "Valdez", "Wainwright", "Wasilla"]
```

## Updating the database from the internet

```ruby
CS.set_license_key('MY_KEY')
CS.update
```

### MaxMind requires a license key (for free) to get download updates

To get the license key:
- Sign up for a MaxMind account: [https://www.maxmind.com/en/geolite2/signup](https://www.maxmind.com/en/geolite2/signup);
- Create a license key: [https://www.maxmind.com/en/accounts/current/license-key](https://www.maxmind.com/en/accounts/current/license-key);

::: tip
MaxMind update their databases weekly on Tuesdays.
:::

---

## How to use it on a form?

Let's say that you have a form with a **state** field to pick:

```erb
<select name="state">
  <option value="al">Alabama</option>
  <option value="ak">Alaska</option>
  ...
</select>
```

With CityState gem, change your code to this:

```erb
<select name="state">
  <% CS.states(:us).each |key, value| %>
  <option value="<%= key %>"><%= value %></option>
  <% end %>
</select>
```

## How to populate cities when the state is changed?

Do it with Ajax:

```ruby
# routes.rb
get 'cities/:state', to: 'application#cities'
```

```ruby
# application_controller.rb
def cities
  render json: CS.cities(params[:state], :us).to_json
end
```

```erb
<!-- _form.html.erb -->
<!-- State list -->
<select name="state">
  <% CS.states(:us).each do |key, value| %>
  <option value="<%= key %>"><%= value %></option>
  <% end %>
</select>

<!-- City list -->
<select name="city">
</select>

<!-- AJAX that loads "City" according to the selected state -->
<script>
$('select[name="state"]').change(function () {
  var input_state = $(this);
  $.getJSON('/cities/' + $(this).val(), function (data) {
    input_state.empty();
    $.each(data, function (i) {
      var opt = '<option value='+ i +'>' + i + '</option>';
      input_state.append(opt);
    });
  });
});
</script>
```
