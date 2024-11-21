import { Text } from '@components/ui/Text';

const technologies = [
  { name: 'Unity', link: 'https://unity.com/es' },
  { name: 'ReactUnity', link: 'https://reactunity.github.io/' },
  { name: 'FastAPI', link: 'https://fastapi.tiangolo.com/' },
  { name: 'Mediapipe', link: 'https://ai.google.dev/edge/mediapipe/solutions/guide' },
  { name: 'Tensorflow', link: 'https://www.tensorflow.org' },
  { name: 'Supabase', link: 'https://supabase.com/' },
];

export default function Technologies() {
  return (
    <ul
      className="flex flex-col"
    >
      {
        technologies.map((tech) => (
          <li
            key={tech.name}
          >
            <Text
              className="justify-start"
              asLink
              url={tech.link}
            >
              *
              {tech.name}
            </Text>
          </li>
        ))
      }
    </ul>
  );
}
