import { inflate } from "zlib";

export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}
// 英雄 
export interface Hero {
  id: number
  name: string
  icon: string
  classify: string[]
}

// 玩家
export interface Palyer {
  id: number
  accountname: string
  nickname: string
  avater: string
  level: number
  exp: number
  rank: number
  bravepoints: number // 勇者积分
  winningstreak: number // 连胜场次
  wanttoplay: Hero[] // 想玩的英雄
}
