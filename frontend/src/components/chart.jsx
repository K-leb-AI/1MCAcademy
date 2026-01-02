"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useUser } from "@/utils/UserProvider";

const chartConfig = {
  completedLessons: {
    label: "Completed lessons",
    color: "var(--chart-1)",
  },
  completedHours: {
    label: "Completed hours",
    color: "#e77436",
  },
};
export function ChartAreaDefault() {
  const { loggedUser } = useUser();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!loggedUser) return;

    fetchChartData();
  }, [loggedUser]);

  const fetchChartData = async () => {
    try {
      const { data, error } = await supabase
        .from("user_lessons")
        .select("completed_at, lessons(runtime)")
        .eq("user_id", loggedUser.id)
        .eq("completed", true)
        .gte(
          "completed_at",
          new Date(new Date().getFullYear(), 0, 1).toISOString()
        );

      if (error) throw error;

      const monthCounts = Array(12).fill(0);
      const monthHours = Array(12).fill(0);

      data?.forEach((lesson) => {
        if (!lesson.completed_at) return;

        const month = new Date(lesson.completed_at).getMonth();

        monthCounts[month]++;

        console.log(monthCounts);

        const runtime = lesson.lessons?.runtime || 0;
        const hours = runtime / 3600;
        monthHours[month] += hours;
      });

      // Format for chart
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const formatted = monthCounts.map((count, i) => ({
        month: months[i],
        completedLessons: count,
        completedHours: Math.round(monthHours[i] * 100) / 100,
      }));

      setChartData(formatted);
      console.log(formatted);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            // margin={{
            //   left: 12,
            //   right: 12,
            // }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="completedLessons"
              type="basis"
              fill="var(--color-completedLessons)"
              fillOpacity={0.4}
              stroke="var(--color-completedLessons)"
            />
            <Area
              dataKey="completedHours"
              type="basis"
              fill="var(--color-completedHours)"
              fillOpacity={0.4}
              stroke="var(--color-completedHours)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
