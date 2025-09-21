import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const ReportsPage = () => {
  // Static data for charts
  const salesData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات الشهرية (درهم)',
        data: [45000, 52000, 48000, 60000, 58000, 62000],
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // Tailwind green-500 with opacity
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const productsData = {
    labels: ['إلكترونيات', 'أثاث', 'رياضة'],
    datasets: [
      {
        label: 'المنتجات المباعة',
        data: [300, 150, 200],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // Tailwind blue-500
          'rgba(16, 185, 129, 0.7)', // Tailwind emerald-500
          'rgba(234, 179, 8, 0.7)',  // Tailwind yellow-400
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(234, 179, 8, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const financialData = {
    labels: ['الإيرادات', 'المصروفات', 'الأرباح'],
    datasets: [
      {
        label: 'القيمة (درهم)',
        data: [120000, 80000, 40000],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)', // green
          'rgba(239, 68, 68, 0.7)', // red
          'rgba(59, 130, 246, 0.7)', // blue
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>التقارير - لوحة التحكم</title>
      </Helmet>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">التقارير والإحصائيات</h1>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">المبيعات الشهرية</h2>
          <Bar data={salesData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: false } } }} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">المنتجات المباعة حسب الفئة</h2>
          <Pie data={productsData} options={{ responsive: true, plugins: { legend: { position: 'right' }, title: { display: false } } }} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">البيانات المالية</h2>
          <Line data={financialData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: false } } }} />
        </section>
      </div>
    </>
  );
};

export default ReportsPage;
