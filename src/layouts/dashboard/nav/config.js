// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'کاربران',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'پیدا نشد',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
