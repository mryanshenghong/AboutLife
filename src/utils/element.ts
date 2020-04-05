import Vue from 'vue'
import {
  Aside,
  Main,
  Container,
  Dropdown,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Carousel,
  CarouselItem,
  Button,
  Timeline,
  TimelineItem,
  Card,
  Col,
  Image,
  Tag,
  Progress,
  Select,
  Option,
  Pagination,
  Loading,
  Dialog,
  Input,
  Form,
  FormItem,
  Message
} from 'element-ui'
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Button)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Image)
Vue.use(Tag)
Vue.use(Container)
Vue.use(Dropdown)
Vue.use(Avatar)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Progress)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Loading.directive)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
