import { useCallback } from "react";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  source?: string;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: any, source?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      source,
    };

    this.logs.push(entry);

    // 최대 로그 수 제한
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // 콘솔에도 출력
    const consoleMethod = level === "debug" ? "log" : level;
    const prefix = `[${level.toUpperCase()}] ${source ? `[${source}] ` : ""}`;

    if (data) {
      console[consoleMethod](prefix + message, data);
    } else {
      console[consoleMethod](prefix + message);
    }

    // 커스텀 이벤트 발생
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app-log", { detail: entry }));
    }
  }

  debug(message: string, data?: any, source?: string) {
    this.log("debug", message, data, source);
  }

  info(message: string, data?: any, source?: string) {
    this.log("info", message, data, source);
  }

  warn(message: string, data?: any, source?: string) {
    this.log("warn", message, data, source);
  }

  error(message: string, data?: any, source?: string) {
    this.log("error", message, data, source);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter((log) => log.level === level);
  }
}

export function useLogger(source?: string) {
  const logger = Logger.getInstance();

  const debug = useCallback(
    (message: string, data?: any) => {
      logger.debug(message, data, source);
    },
    [logger, source]
  );

  const info = useCallback(
    (message: string, data?: any) => {
      logger.info(message, data, source);
    },
    [logger, source]
  );

  const warn = useCallback(
    (message: string, data?: any) => {
      logger.warn(message, data, source);
    },
    [logger, source]
  );

  const error = useCallback(
    (message: string, data?: any) => {
      logger.error(message, data, source);
    },
    [logger, source]
  );

  return {
    debug,
    info,
    warn,
    error,
    getLogs: logger.getLogs.bind(logger),
    clearLogs: logger.clearLogs.bind(logger),
    getLogsByLevel: logger.getLogsByLevel.bind(logger),
  };
}
