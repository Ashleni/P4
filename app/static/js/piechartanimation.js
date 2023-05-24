function change(selected) {
    console.log(selected);
    //document.getElementById("pie_chart").remove();
    if (selected == "Taco Bell") { TacoBell(); }
    if (selected == "Burger King") { BKing(); }
    if (selected == "Sonic") { Sonic(); }
    if (selected == "McDonald's") { McDo(); }
    if (selected == "Wendy's") { Wendy(); }
    if (selected == "Domino's") { Domino(); }
    if (selected == "Whataburger") { Whataburger(); }
    if (selected == "Popeyes") { Popeyes(); }
    if (selected == "Subway") { Subway(); }
    if (selected == "Pizza Hut") { PizzaHut(); }
    if (selected == "Arby's") { Arbys(); }
    if (selected == "Chick-fil-A") { ChickfilA(); }
    if (selected == "Jack-in-the-Box") { JackintheBox(); }
    if (selected == "Bojangle's") { Bojangles(); }
  }

  const filter = document.getElementById('chosen');
  filter.addEventListener('change', function () {
    const selected = filter.value;
    document.getElementById("displaying").innerHTML = "Currently displaying the regional distribution of " + selected
    change(selected);
  });