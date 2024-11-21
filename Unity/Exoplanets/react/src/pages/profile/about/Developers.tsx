import { Text } from '@components/ui/Text';

const developers = [
  {
    name: 'Álvaro Raúl Quispe Condori', rol: 'Backend', username: 'ALVARO-QUISPE-UNSA',
  },
  {
    name: 'Christian Raúl Mestas Zegarra', rol: 'Backend', username: 'cmestasz',
  },
  {
    name: 'Diego Alejandro Carbajal González', rol: 'Frontend', username: 'Gocardi',
  },
  {
    name: 'Luis Gustavo Sequeiros Condori', rol: 'Frontend', username: 'gusCreator',
  },
  {
    name: 'Ryan Fabian Valdivia Segovia', rol: 'Backend', username: 'RyanValdivia',
  },

];

export default function Developers() {
  return (
    <ul className="flex flex-col">
      {
        developers.map((dev) => (
          <li
            key={dev.username}
            className="flex flex-row gap-1"
          >
            <span className="flex flex-row gap-3">
              {'•'}
              {dev.name}
            </span>
            <Text asLink inline url={`https://github.com/${dev.username}`} content={`(${dev.username})`} />
          </li>
        ))
      }
    </ul>
  );
}
