/**
 * Structured logger with level-gated output.
 *
 * In development (`NODE_ENV !== 'production'`) all levels are printed.
 * In production, only `warn` and `error` are printed — debug/info are no-ops.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

const isProd = process.env.NODE_ENV === "production";

function timestamp() {
  return new Date().toISOString();
}

function format(level: LogLevel, tag: string, message: string, data?: Record<string, unknown>) {
  const base = `[${timestamp()}] [${level.toUpperCase()}] [${tag}] ${message}`;
  if (data && Object.keys(data).length > 0) {
    // In prod, strip potentially sensitive fields
    const safeData = isProd
      ? Object.fromEntries(
          Object.entries(data).filter(
            ([key]) => !["password", "otp", "token", "secret", "email"].includes(key.toLowerCase())
          )
        )
      : data;
    return `${base} ${JSON.stringify(safeData)}`;
  }
  return base;
}

function createLogger(tag: string) {
  return {
    debug(message: string, data?: Record<string, unknown>) {
      if (!isProd) console.log(format("debug", tag, message, data));
    },
    info(message: string, data?: Record<string, unknown>) {
      if (!isProd) console.log(format("info", tag, message, data));
    },
    warn(message: string, data?: Record<string, unknown>) {
      console.warn(format("warn", tag, message, data));
    },
    error(message: string, data?: Record<string, unknown>) {
      console.error(format("error", tag, message, data));
    },
  };
}

export default createLogger;
