import React, {useState} from "react";
import './App.css';
import SearchBar from "./SearchBar";
import {Series} from "./Series";
import SeriesGrid from "./SeriesGrid";
import {Episode} from "./Episode";

function App() {
  const [series, setSeries] : Series[] = useState([]);

  const addToSeries = async (show) => {
      const newSeries = series;

      if (series.filter(se => se.getId() === show.getId()) < 1) {
          newSeries.push(show);

          setSeries(newSeries);

          show.postSeries();

          //show.postStories();

          /*const episodes : Episode[] = await show.getEpisodes();

          let epIndex = 0,
              currentEpisode,
              nextEpisode,
              story,
              epInfo;

          const stories = [];

          const getWikiContent = async (title) => {
              let content = null;

              await fetch(`https://am2012.brighton.domains/tv_story_selector/getContentFromWiki?page=${encodeURI(title)}`, {method: 'GET'})
                  .then(page => page.json().then(pageData => {
                      const text = pageData.content.parse.text;
                      content = Object.getOwnPropertyDescriptor(text, "*").value;
                  }))
                  .catch((err) => console.log(err));

              return content;
          }

          const getMultiPartEpisode = async (epName) => {
              let resultsTitles = null,
                  resultsURLs = null;

              await fetch(`https://am2012.brighton.domains/tv_story_selector/searchWiki?search=${encodeURI(epName)} ${encodeURI(show.name)}`, { method: 'GET' })
                  .then(responses => responses.json().then(searchData => {
                      resultsTitles = searchData.results[1];
                      resultsURLs = searchData.results[3];
                  }))
                  .catch((err) => console.log(err));

              if (resultsURLs === null || resultsURLs === undefined || resultsURLs.length < 1) {
                  await fetch(`https://am2012.brighton.domains/tv_story_selector/searchWiki?search=${encodeURI(epName)}`, { method: 'GET' })
                      .then(responses2 => responses2.json().then(searchData2 => {
                          resultsTitles = searchData2.results[1];
                          resultsURLs = searchData2.results[3];
                      }))
                      .catch((err) => console.log(err));
              }

              let part = null;

              if (resultsTitles) {
                  let wTitle = null;

                  if (resultsTitles.length > 1) {
                      let ri = 0,
                          definitelyFound = false;

                      while (ri < resultsTitles.length) {
                          const urlSplt = resultsURLs[ri].split(`/`);

                          if (resultsTitles[ri].includes(`episode`) && !resultsTitles[ri].includes(`novel`)) {
                              wTitle = urlSplt[urlSplt.length - 1];
                              definitelyFound = true;
                          } else if ((resultsTitles[ri].includes(show.name) && !resultsTitles[ri].includes(`novel`)) || resultsTitles[ri] === currentEpisode) {
                              wTitle = urlSplt[urlSplt.length - 1];
                          }

                          if (definitelyFound) {
                              ri = resultsTitles.length;
                          }

                          ri += 1;
                      }
                  } else if (resultsURLs.length > 0) {
                      const splt = resultsURLs[0].split(`/`);
                      wTitle = splt[splt.length - 1];
                  }

                  if (wTitle) {
                      let html = await getWikiContent(wTitle);

                      if (html && html.includes('<div class="redirectMsg">')) {
                          wTitle = html.substr(html.indexOf('<a href="/wiki/') + 15).split('"')[0];

                          html = await getWikiContent(wTitle);
                      }

                      if (html) {
                          const desc = html.split('<h2><span class="mw-headline"')[0];

                          if (desc && desc.includes("-part story")) {
                              const section = desc.substr(desc.indexOf('-part story') - 20);

                              if (section.includes("first ") || section.includes("1st ")) {
                                  part = "first";
                              } else {
                                  part = "next";
                              }
                          }
                      }
                  }
              }

              return part;
          }

          while (epIndex < episodes.length) {
              currentEpisode = episodes[epIndex];
              nextEpisode = episodes[epIndex + 1] ? episodes[epIndex + 1] : null;
              story = [];

              if ((currentEpisode.name.endsWith(`(1)`) && nextEpisode.endsWith(`(2)`)
                  || (currentEpisode.name.toLowerCase().includes(`part one`) && nextEpisode.name.toLowerCase().includes(`part two`))
                  || (currentEpisode.name.toLowerCase().includes(`part 1`) && nextEpisode.name.toLowerCase().includes(`part 2`))
                  || (currentEpisode.name.toLowerCase().includes(`part i`) && nextEpisode.name.toLowerCase().includes("part ii"))
                  || (currentEpisode.name.toLowerCase().includes(`chapter one`) && nextEpisode.name.toLowerCase().includes(`chapter two`))
                  || (currentEpisode.name.toLowerCase().includes(`chapter 1`) && nextEpisode.name.toLowerCase().includes(`chapter 2`))
                  || (
                      nextEpisode
                      && (
                          currentEpisode.name.replace(` 1`, ``) === nextEpisode.name.replace(` 2`, ``)
                          && !currentEpisode.name.toLowerCase().includes(`episode`)
                      )
                  )
              )) {
                  story.push(currentEpisode, nextEpisode);
                  epIndex += 2;
                  let part = 3;

                  while (
                      epIndex < episodes.length
                      &&
                      (
                          !episodes[epIndex].name.toLowerCase().includes(`part one`)
                          && (
                              !episodes[epIndex].name.toLowerCase().includes(`part 1`)
                              || episodes[epIndex].name.toLowerCase().includes(`part 10`)
                          )
                          && !episodes[epIndex].name.toLowerCase().includes(`part i`)
                          && !episodes[epIndex].name.toLowerCase().includes(`chapter one`)
                          && (
                              !episodes[epIndex].name.toLowerCase().includes(`chapter 1:`)
                              || !episodes[epIndex].name.toLowerCase().includes(`chapter 1 `)
                          )
                      )
                      &&
                      (
                          episodes[epIndex].name.endsWith(`(${part})`)
                          || episodes[epIndex].name.toLowerCase().includes(`part `)
                          || episodes[epIndex].name.toLowerCase().includes(`chapter `)
                          || (
                              episodes[epIndex + 1]
                              && (episodes[epIndex].name.replace(` ${part}`, ``) === episodes[epIndex + 1].name.replace(` ${part + 1}`, ``))
                          )
                      )
                      ) {
                      story.push(episodes[epIndex].name);
                      part += 1;
                      epIndex += 1;
                  }

                  stories.push(story);
              } else {
                  epInfo = await getMultiPartEpisode(currentEpisode.name);

                  if (epInfo === "first") {
                      story.push(currentEpisode, nextEpisode);
                      epIndex += 2;

                      epInfo = await getMultiPartEpisode(episodes[epIndex].name);

                      while (epInfo === "next") {
                          story.push(episodes[epIndex].name);
                          epIndex += 1;
                          epInfo = await getMultiPartEpisode(episodes[epIndex].name);
                      }

                      stories.push(story);
                  } else {
                      stories.push(currentEpisode);
                      epIndex += 1;
                  }
              }
          }

          console.log(stories);*/
      } else {
          alert(`This series has already been added`);
      }
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>TV Story Selector</h1>

          <SearchBar selectSeries={(s) => addToSeries(s)} />

          <SeriesGrid series={series} />
      </header>
    </div>
  );
}

export default App;
