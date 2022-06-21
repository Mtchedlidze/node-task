import { Router } from 'express'
import { AuthMiddleware } from './auth/auth.middleware'
import { ArticleDTO } from './common/dtos/article.dto'
import { UserDTO } from './common/dtos/user.dto'
import { ArticleController } from './controllers/article.controller'
import { UserController } from './controllers/user.controller'
import { validator } from './middleware/validation.middleware'
const router = Router()

const articleController = new ArticleController()
const userController = new UserController()
const authMiddleware = new AuthMiddleware()
//articles
router.post(
  '/article/create',
  validator(ArticleDTO),
  authMiddleware.validateToken.bind(authMiddleware),
  articleController.create.bind(articleController),
)
router.post(
  '/article/:id',
  authMiddleware.validateToken.bind(authMiddleware),
  articleController.update.bind(articleController),
)
router.delete(
  '/article/:id',
  authMiddleware.validateToken.bind(authMiddleware),
  articleController.remove.bind(articleController),
)
router.get(
  '/article/published',
  authMiddleware.validateToken.bind(authMiddleware),
  articleController.getArticles.bind(articleController),
)

//user
router.post(
  '/user',
  validator(UserDTO),
  userController.create.bind(userController),
)

router.post('/user/login', authMiddleware.login.bind(authMiddleware))
router.get(
  '/user',
  authMiddleware.validateToken.bind(authMiddleware),
  userController.findOne.bind(userController),
)

export default router
