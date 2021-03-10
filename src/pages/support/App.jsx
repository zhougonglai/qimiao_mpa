import React, { useRef } from 'react';
import { useMount, useLocalStorageState, useSetState, useDebounceEffect } from 'ahooks';
import classNames from 'classnames'
import Bouncing from '~/components/Bouncing';
import request from '~/utils/request';
import searchIcon from '~/assets/img/search.svg';
import './App.scss';

const allType = [
  {
    key: 'all',
    label: '全部',
  },
];
const hotAndFree = [
  {
    key: 'is_hot',
    label: '热门',
  },
  {
    key: 'is_free',
    label: '限免',
  },
];

const otherType = [
  {
    key: 'steam',
    label: 'steam',
  },
  {
    key: 'origin',
    label: 'origin',
  },
  {
    key: 'uplay',
    label: 'uplay',
  },
  {
    key: 'xbox',
    label: 'xbox',
  },
  {
    key: 'ps4s',
    label: 'ps4s',
  },
  {
    key: 'witch',
    label: 'witch',
  },
]

const pageGation = (games = []) => ({
  size: 80,
  index: 1,
  total: games.length,
  totalPage: Math.ceil(games.length / 80),
})

function GameSupport() {
  const [ cache, setCache ] = useLocalStorageState('game-support');
  const [ state, setState ] = useSetState({
    games: [],
    filterGames: [],
    pages: pageGation(),
    tags: allType.concat(hotAndFree, otherType),
    tag: 'all',
    search: ''
  });

  useDebounceEffect(() => {
    // console.log(state.search)
    if(state.search) {
      const filterGames = state.games.filter(game => game.title.includes(state.search));
      setState({
        filterGames,
        pages: pageGation(filterGames)
      });
    } else {
      setState({
        filterGames: state.games,
        pages: pageGation(state.games)
      })
    }
  }, [state.search] ,{ wait: 500, leading: true });

  const handleTagChange = tag => {
    if(tag !== state.tag) {
      const action = {
        allType : () => cache,
        hotAndFree : type => cache.filter(game => game[type]),
        otherType : type => cache.filter(game => game.game_label && game.game_label.includes(type))
      }

      if(allType.some(game => game.key === tag)) {
        const games = action.allType();
        const filterGames = games.filter(game => game.title.includes(state.search));
        setState({
          tag,
          games,
          filterGames,
          pages: pageGation(filterGames)
        })
      } else if(hotAndFree.some(game => game.key === tag)) {
        const games = action.hotAndFree(tag);
        const filterGames = games.filter(game => game.title.includes(state.search));
        setState({
          tag,
          games,
          filterGames,
          pages: pageGation(filterGames)
        })
      } else if(otherType.some(game => game.key === tag)) {
        const games = action.otherType(tag);
        const filterGames = games.filter(game => game.title.includes(state.search));
        setState({
          tag,
          games,
          filterGames,
          pages: pageGation(filterGames)
        })
      }
    }
  }

  const handlePageChange = page => {
    if(page !== state.pages.index) {
      setState({ pages: {
        ...state.pages,
        index: page
      }})
    }
  }

  const handleSearch = inputEvent => {
    if(state.search !== inputEvent.target.value) {
      setState({
        search: inputEvent.target.value
      })
    }
  }

  useMount(async() => {
    if(cache) {
      setState({
        games: cache,
        filterGames: cache,
        pages: pageGation(cache)
      });
    } else {
      const { data } = await request(`${import.meta.env.VITE_BASE_PATH}api/game`, {
        method: 'post'
      });
      const games = data.map((game, i) => ({...game, key: i}));
      // const filterGames = games.filter(game => game.title.includes(state.search));
      setCache(games);
      setState({
        games,
        filterGames: games,
        pages: pageGation(games)
      });
    }
  })


  return (
    <>
      <div className="support-header flex justify-between">
        <ul className="tags flex">
          {
            state.tags.map((tag, i) =>
            <li
              className={classNames('tag', {active: tag.key === state.tag})}
              onClick={() => handleTagChange(tag.key)}
              key={tag.key}>
              {tag.label}
            </li>)
          }
        </ul>

        <div className="search-contrl flex">
          <input type="search"
          className="search-input"
          list="games"
          placeholder="Search"
          value={state.search}
          onInput={handleSearch}
          />
          <div className="search-icon mr-2">
            <img src={searchIcon} width="25" alt="搜索" />
          </div>
          <datalist id="games">
            {
              state.games.map((game, i) =>
              <option value={game.title} key={game.key}/>)
            }
          </datalist>
        </div>
      </div>
      <div className="support-body mt-4">
        {
          state.games.length
          ?
            <>
            <div className="support-games py-2 grid grid-cols-8">
              {
                state.filterGames.slice((state.pages.index - 1) * state.pages.size, state.pages.index * state.pages.size).map((game, i) => <div className="support-game px-2 cursor-pointer truncate" key={game.key}>{game.title}</div>)
              }
            </div>
            <div className="support-pages flex justify-end my-2">
              <div className="page-contrls flex gap-x-4">
                <button
                className="page-contrl page-first"
                onClick={() => handlePageChange(1)}
                disabled={state.pages.index === 1}>
                  首页
                </button>
                <button
                className="page-contrl page-prev"
                onClick={() => handlePageChange(state.pages.index - 1)}
                disabled={state.pages.index === 1}>
                  上一页
                </button>
                {
                  state.pages.totalPage >= 5
                  ? <>
                      {
                        state.pages.index <= 3
                        ? <>
                            {
                              Array(state.pages.index + 1).fill(state.pages.index).map((e, i) =>
                              <button
                              className={classNames('page-index', {active: state.pages.index === i + 1 })} key={i + 1}
                              onClick={() => handlePageChange(i+1)}>
                                {i + 1}
                              </button>
                              )
                            }
                          </>
                        : <>
                            <button className="page-index" onClick={() => handlePageChange(1)}>1</button>
                            <div className="page-placehodle">...</div>
                          </>
                      }
                      {
                        (state.pages.index > 3 && state.pages.index < state.pages.totalPage - 2)
                        ? [state.pages.index - 1, state.pages.index, state.pages.index + 1]
                        .map((page) =>
                          <button
                            className={classNames("page-index", {active: state.pages.index === page})}
                            key={page}
                            onClick={() => handlePageChange(page)}>
                            {page}
                          </button>)
                        : null
                      }
                      {
                        state.pages.index >= state.pages.totalPage - 2
                        ?
                        <>
                          {
                            Array(state.pages.totalPage).fill(state.pages.index)
                            .map((p, i) => i + 1)
                            .slice(state.pages.index - 2, state.pages.totalPage)
                            .map((p, i) =>
                            <button
                            className={classNames('page-index', {active: state.pages.index === p })} key={p}
                            onClick={() => handlePageChange(p)}>
                              {p}
                            </button>
                            )
                          }
                        </>
                        :
                        <>
                          <div className="page-placehodle">...</div>
                          <button className="page-index" onClick={() => handlePageChange(state.pages.totalPage)}>{state.pages.totalPage}</button>
                        </>
                      }
                    </>
                  :
                  <>
                    {
                      Array(state.pages.totalPage)
                      .fill(state.pages.totalPage)
                      .map((p, i) => i + 1).map((page, i) =>
                      <button
                      className={classNames("page-index", {active: state.pages.index === page })}
                      onClick={() => handlePageChange(page)}
                      key={page}>
                        {page}
                      </button>)
                    }
                  </>
                }
                <button
                className="page-contrl page-next"
                onClick={() => handlePageChange(state.pages.index + 1)}
                disabled={state.pages.index === state.pages.totalPage}>
                  下一页
                </button>
                <button
                className="page-contrl page-last"
                onClick={() => handlePageChange(state.pages.totalPage)}
                disabled={state.pages.index === state.pages.totalPage}>
                  末页
                </button>
              </div>
            </div>
          </>
          : <div className="games-empty flex justify-center items-center text-lg text-gray-500 cursor-default">
          没有该类型的游戏
        </div>
        }
      </div>
    </>
  );
}


export default GameSupport;
