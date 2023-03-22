import { faker } from '@faker-js/faker/locale/fa'
import { faDate } from '../utils/formatTime';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => {
  const birthday = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
  return {
    id: faker.datatype.uuid(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    fatherName: faker.name.firstName({ sex: 'male' }),
    birthday: { data: birthday, faDate: faDate(birthday) }
  }
});

export default users;
