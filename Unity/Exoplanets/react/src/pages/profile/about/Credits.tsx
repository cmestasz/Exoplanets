import { Text } from '@components/ui/Text';

const credits = [
  {
    id: '5-concrete-materials-1-255940', name: '5 Concrete Materials #1', author: 'Undoing Planets', link: 'https://assetstore.unity.com/packages/2d/textures-materials/concrete/5-concrete-materials-1-255940',
  },
  {
    id: 'free-skyboxes-space-178953', name: '*FREE* Skyboxes - Space', author: 'Dogmatic', link: 'https://assetstore.unity.com/packages/p/free-skyboxes-space-178953',
  },
  {
    id: 'particle-pack-127325', name: 'Particle Pack', author: 'UnityTechnologies', link: 'https://assetstore.unity.com/packages/p/particle-pack-127325',
  },
];

export default function Credits() {
  return (
    <ul
      className="flex flex-col"
    >
      {
        credits.map((credit) => (
          <li
            key={credit.id}
            className="flex flex-row gap-1"
          >
            <span className="flex flex-row gap-3">
              {'•'}
              <Text
                className="justify-start"
                asLink
                inline
                url={credit.link}
                content={credit.name}
              />
            </span>
            -
            {credit.author}
          </li>
        ))
      }
    </ul>
  );
}
