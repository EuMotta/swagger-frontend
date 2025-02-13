interface DateProps {
  date: Date;
  type?: 'date' | 'time' | 'date_time' | 'post';
}

const dateConverter = ({ date, type = 'date_time' }: DateProps) => {
  const convertToLocalDate = (inputDate: Date) => {
    const now = new Date();
    const localDate = new Date(inputDate);
    const diffInMs = now.getTime() - localDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (type === 'post') {
      if (diffInDays >= 3) {
        return localDate.toLocaleDateString();
      } else if (diffInDays === 2) {
        return `Anteontem, ${localDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
      } else if (diffInDays === 1) {
        return `Ontem, ${localDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
      } else if (diffInDays === 0) {
        return `Hoje, ${localDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
      }
    }

    switch (type) {
      case 'date':
        return localDate.toLocaleDateString();
      case 'time':
        return localDate.toLocaleTimeString();
      case 'date_time':
      default:
        return localDate.toLocaleString();
    }
  };

  return convertToLocalDate(date);
};

export default dateConverter;
