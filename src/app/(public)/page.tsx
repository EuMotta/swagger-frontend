import React from 'react';
import { FaArrowRight, FaPlayCircle } from 'react-icons/fa';
import { PiKanbanDuotone } from 'react-icons/pi';

import Container from '@/components/common/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Header = () => {
  const navLinks = [
    { label: 'Features', href: 'https://webcrumbs.cloud/placeholder' },
    { label: 'Solutions', href: 'https://webcrumbs.cloud/placeholder' },
    { label: 'Pricing', href: 'https://webcrumbs.cloud/placeholder' },
    { label: 'Resources', href: 'https://webcrumbs.cloud/placeholder' },
  ];

  return (
    <header className="py-6">
      <nav className="flex justify-between items-center px-8">
        <div className="flex items-center gap-2">
          <PiKanbanDuotone size={30} />
          <span className="text-2xl font-bold text-primary-700">KanApp</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-medium hover:text-primary-600 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="font-medium hover:text-primary-600 transition-colors">
            Log in
          </button>
          <Button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors transform hover:scale-105 duration-200">
            Get Started Free
          </Button>
        </div>
      </nav>
    </header>
  );
};

const Hero = () => (
  <section className="py-12 px-8 ">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Streamline your workflow with{' '}
          <span className="text-primary-600">KanFlow</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          The powerful, flexible, and intuitive kanban board that helps teams
          visualize work, maximize efficiency, and improve continuously.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className=" flex items-center transition-all hover:scale-[1.02] gap-2">
            <span>Start for free</span>
            <FaArrowRight />
          </Button>
          <Button variant="outline" className=" flex items-center  gap-2">
            <FaPlayCircle />
            <span>Watch demo</span>
          </Button>
        </div>
        <div className="mt-8 flex items-center gap-2">
          <div className="flex -space-x-2">
            <img
              className="h-8 w-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/11.jpg"
              alt="User"
            />
            <img
              className="h-8 w-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
            />
            <img
              className="h-8 w-8 rounded-full border-2 border-white"
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="User"
            />
          </div>
          <span className="text-sm text-gray-600">
            Trusted by 10,000+ teams worldwide
          </span>
        </div>
      </div>
      <div className="md:w-1/2">
        <KanbanBoard />
      </div>
    </div>
  </section>
);

const KanbanBoard = () => {
  const columns = [
    {
      title: 'To Do',
      count: 4,
      tasks: [
        {
          category: { label: 'Feature', color: 'bg-blue-100 text-blue-800' },
          time: '2d',
          title: 'Create user onboarding flow',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          comments: 3,
        },

        {
          category: {
            label: 'Research',
            color: 'bg-purple-100 text-purple-800',
          },
          time: '1d',
          title: 'Competitor analysis',
          badge: {
            label: 'High Priority',
            color: 'bg-yellow-100 text-yellow-800',
          },
        },
      ],
    },
    {
      title: 'In Progress',
      count: 3,
      tasks: [
        {
          category: {
            label: 'UI Design',
            color: 'bg-green-100 text-green-800',
          },
          time: '1d',
          title: 'Dashboard redesign',
          progress: '66%',
          avatars: [
            'https://randomuser.me/api/portraits/men/32.jpg',
            'https://randomuser.me/api/portraits/women/68.jpg',
          ],
        },
        {
          category: { label: 'Bug Fix', color: 'bg-red-100 text-red-800' },
          time: '4h',
          title: 'Fix authentication issue',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
          comments: 5,
        },
      ],
    },
    {
      title: 'Review',
      count: 2,
      tasks: [
        {
          category: {
            label: 'Backend',
            color: 'bg-indigo-100 text-indigo-800',
          },
          time: '1h',
          title: 'API integration for notifications',
          avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
          badge: { label: 'Ready', color: 'bg-green-100 text-green-800' },
        },
      ],
    },
    {
      title: 'Done',
      count: 5,
      tasks: [
        {
          category: { label: 'Feature', color: 'bg-teal-100 text-teal-800' },
          time: '2d',
          title: 'User settings page',
          avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
          completed: true,
        },
        {
          category: {
            label: 'Testing',
            color: 'bg-orange-100 text-orange-800',
          },
          time: '1d',
          title: 'Unit tests for auth module',
          completed: true,
        },
      ],
    },
  ];

  return (
    <Card className="bg-white rounded-xl shadow-xl p-4 transform hover:-translate-y-1 transition-transform duration-300">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Project Dashboard</h3>
          <div className="flex gap-2">
            <button className="p-1 rounded-md hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            <button className="p-1 rounded-md hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <KanbanColumn key={column.title} column={column} />
          ))}
        </div>
      </div>
    </Card>
  );
};

const KanbanColumn = ({ column }: any) => (
  <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow p-3">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-semibold text-gray-700">{column.title}</h4>
      <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
        {column.count}
      </span>
    </div>
    <div className="space-y-2">
      {column.tasks.map((task, index) => (
        <KanbanCard key={index} task={task} />
      ))}
    </div>
  </div>
);

const KanbanCard = ({ task }: any) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex justify-between">
        <span
          className={`text-xs font-medium rounded-full px-2 py-0.5 ${task.category.color}`}
        >
          {task.category.label}
        </span>
        <span className="text-xs text-gray-500">{task.time}</span>
      </div>
      <h5
        className={`font-medium mt-2 ${
          task.completed ? 'line-through text-gray-500' : ''
        }`}
      >
        {task.title}
      </h5>
      {task.progress && (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div
            className="bg-primary-600 h-1.5 rounded-full"
            style={{ width: task.progress }}
          ></div>
        </div>
      )}
      {task.avatar && (
        <div className="flex items-center mt-2">
          <img className="h-6 w-6 rounded-full" src={task.avatar} alt="User" />
        </div>
      )}
      {task.avatars && (
        <div className="flex items-center mt-2">
          {task.avatars.map((url, idx) => (
            <img
              key={idx}
              className={`h-6 w-6 rounded-full ${
                idx !== 0 ? '-ml-1 border border-white' : ''
              }`}
              src={url}
              alt="User"
            />
          ))}
        </div>
      )}
      {task.comments && (
        <div className="flex items-center justify-end mt-2 gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs text-gray-600">{task.comments}</span>
        </div>
      )}
      {task.badge && (
        <div className="mt-2 flex justify-end">
          <span
            className={`text-xs rounded-full px-2 py-0.5 ${task.badge.color}`}
          >
            {task.badge.label}
          </span>
        </div>
      )}
    </div>
  );
};

const TrustedBrands = () => {
  const brands = [
    {
      src: 'https://www.svgrepo.com/show/303124/airbnb-logo.svg',
      alt: 'Airbnb',
    },
    {
      src: 'https://www.svgrepo.com/show/303154/dropbox-logo.svg',
      alt: 'Dropbox',
    },
    {
      src: 'https://www.svgrepo.com/show/353655/discord-icon.svg',
      alt: 'Discord',
    },
    {
      src: 'https://www.svgrepo.com/show/303108/slack-logo.svg',
      alt: 'Slack',
    },
    {
      src: 'https://www.svgrepo.com/show/303266/zoom-logo.svg',
      alt: 'Zoom',
    },
    {
      src: 'https://www.svgrepo.com/show/303167/ibm-logo.svg',
      alt: 'IBM',
    },
  ];

  return (
    <section className="py-12 px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          Trusted by innovative teams worldwide
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Teams of all sizes and industries use KanFlow to boost productivity,
          visualize work, and deliver value faster.
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-12">
        {brands.map((brand) => (
          <img
            key={brand.alt}
            src={brand.src}
            alt={brand.alt}
            className="h-8 grayscale hover:grayscale-0 transition-all duration-300"
          />
        ))}
      </div>
    </section>
  );
};

const Page = () => {
  return (
    <Container>
      <div className="w-full font-sans">
        <Header />
        <main>
          <Hero />
          <TrustedBrands />
        </main>
      </div>
    </Container>
  );
};

export default Page;
