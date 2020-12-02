import { Response, Request } from 'express'
import { Hero, Palyer } from '../src/api/types'
import { heros } from './heros'
import faker from 'faker'

faker.setLocale('zh_CN')
// 模拟玩家数据
const playercount = 100
const playerList: Palyer[] = []
for (let i = 0; i < playercount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.lastName() + faker.name.firstName(),
    avater: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(100000),
    level: faker.random.number(30),
    nickname: faker.name.lastName() + faker.name.firstName(),
    rank: faker.random.number(200),
    wanttoplay: genWantoPlay(),
    winningstreak: faker.random.number(10)
  })
}

function genWantoPlay() {
  let wanttoplay: Set<Hero> = new Set()
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wanttoplay)
}

// 路由实现
export const getPlayers = (req: Request, res: Response) => {
  // 从查询参数中获取分页、过滤关键词等参数
  const { accountname, page = 1, limit = 10 } = req.query;
  let mockList = playerList.filter(item => {
    if (accountname && item.accountname.indexOf(accountname as string) < 0) {
      return false;
    }
    return true
  })

  const pageList = mockList.filter((item, index) => {
    const l = parseInt(limit as string),
      p = parseInt(page as string)
    return index < l * p && index >= l * (p - 1)
  })



  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      players: pageList
    }
  })
}

export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params;
  for (const player of playerList) {
    if (player.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: '没有找到该玩家'
  })
}
